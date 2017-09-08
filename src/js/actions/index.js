import { URL, GET_HEADERS } from '../api/Api'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category,
})

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const receiveCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories,
})

export const fetchCategories = () => (dispatch) => {
  fetch(`${URL}/categories`, GET_HEADERS)
    .then(res => res.json())
    .then(data => dispatch(receiveCategories(data.categories)))
}

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_BY_CATEGORY = 'FETCH_POSTS_BY_CATEGORY'

export const receivePosts = posts => ({
  type: FETCH_POSTS,
  posts,
})

export const fetchPosts = (category = '') => (dispatch) => {
  fetch(`${URL}${category !== '' ? `/${category}` : ''}/posts`, GET_HEADERS)
    .then(res => res.json())
    .then(data => dispatch(receivePosts(data)))
}

export const receivePostsByCategory = posts => ({
  type: FETCH_POSTS_BY_CATEGORY,
  posts,
})

export const fetchPostsByCategory = category => (dispatch) => {
  fetch(`${URL}/${category}/posts`, GET_HEADERS)
    .then(res => res.json())
    .then(data => dispatch(receivePosts(data)))
}
