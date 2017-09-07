import * as API from '../api/Api'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const receiveCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories,
})

export const fetchCategories = () => (/* dispatch*/) => {
  console.log(API.getCategories())
    // .then(categories => dispatch(receiveCategories(categories)))
}
