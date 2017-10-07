import { combineReducers } from 'redux'
import {
	FETCH_CATEGORIES, FETCH_POST_COMMENTS, FETCH_POST_DETAIL, FETCH_POSTS, POST_COMMENT,
	VOTE_POST,
} from '../actions/index'

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
	comments: [],
}

function posts(state = initialPosts, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				list: [...action.posts.sort((a, b) => a.voteScore < b.voteScore)],
			}
		case FETCH_POST_DETAIL:
		case VOTE_POST:
			return {
				...state,
				post: { ...action.post },
			}
		case FETCH_POST_COMMENTS:
			return {
				...state,
				comments: [...action.comments],
			}
		case POST_COMMENT:
			const comments = [...state.comments]
			comments.push(action.comment)

			return {
				...state,
				comments,
				comment: { ...action.comment },
			}
		default:
			return state
	}
}

export default combineReducers({
	categories,
	posts,
});
