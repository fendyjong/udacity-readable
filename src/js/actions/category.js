import Api from '../api/Api'

import { SELECT_CATEGORY, FETCH_CATEGORIES } from './index'

/**
 * Select category
 *
 * @param category
 */
export const selectCategory = category => ({
	type: SELECT_CATEGORY,
	category,
})

/**
 * Fetch categories from server
 */
export const fetchCategories = () => (dispatch) => {
	Api.fetchCategories().then(data => dispatch({ type: FETCH_CATEGORIES, categories: data }))
}
