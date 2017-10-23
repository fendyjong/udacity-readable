import { FETCH_CATEGORIES } from '../actions'

/**
 * Categories redux state
 *
 * @param state
 * @param action
 * @returns {*}
 */
export const categories = (state = {}, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return {
				...state,
				...action.categories,
			}
		default:
			return state
	}
}

export default categories
