import { combineReducers } from 'redux'
import { FETCH_CATEGORIES, FETCH_POST_DETAIL, FETCH_POSTS } from '../actions/index'

const initialCategories = {
  list: [],
}

function categories(state = initialCategories, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        list: [...action.categories],
      }
    default:
      return state
  }
}

const initialPosts = {
  list: [],
  post: {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: '',
    deleted: false,
  },
}

function posts(state = initialPosts, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        list: [...action.posts.sort((a, b) => a.voteScore < b.voteScore)],
      }
    case FETCH_POST_DETAIL:
      return {
        ...state,
        post: { ...action.post },
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
});
