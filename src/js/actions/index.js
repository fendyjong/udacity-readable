import { api } from '../api/Api'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category,
})

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const fetchCategories = () => (dispatch) => {
  api.fetchCategories().then(data => dispatch({ type: FETCH_CATEGORIES, categories: data }))
}

export const FETCH_POSTS = 'FETCH_POSTS'

export const fetchPosts = (category = '') => (dispatch) => {
  api.fetchPosts(category).then(data => dispatch({ type: FETCH_POSTS, posts: data }))
}

export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL'

export const fetchPost = key => (dispatch) => {
  api.fetchPostDetail(key).then(data => dispatch({ type: FETCH_POST_DETAIL, post: data }))
}
