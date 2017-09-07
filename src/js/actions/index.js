import { URL, GET_HEADERS } from '../api/Api'

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
