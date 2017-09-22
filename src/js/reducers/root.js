import { combineReducers } from 'redux'
import { FETCH_CATEGORIES, FETCH_POSTS } from '../actions/index'

const initialCategories = {
  categories: [],
}

function categories(state = initialCategories, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        ...action.categories,
      };
    default:
      return state
  }
}

const initialPosts = {}

function posts(state = initialPosts, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        ...action.posts.sort((a, b) => a.voteScore < b.voteScore),
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
});
