import { combineReducers } from 'redux'
import {
	FETCH_CATEGORIES,
	POST_SORT_LIST,
	FETCH_POST_DETAIL, FETCH_POSTS, VOTE_POST, SUBMIT_POST,
	FETCH_POST_COMMENTS, SUBMIT_COMMENT, VOTE_COMMENT,
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
	sortAscending: true,
	sortIndex: 3,
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
	let comments = [...state.comments]

	switch (action.type) {
		case POST_SORT_LIST:
			let list
			const sortAscending = !state.sortAscending
			switch (action.sortIndex) {
				case 0:
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.timestamp < b.timeStamp)]
					} else {
						list = [...state.list.sort((a, b) => a.timestamp > b.timeStamp)]
					}
					break
				case 1:
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.title < b.title)]
					} else {
						list = [...state.list.sort((a, b) => a.title > b.title)]
					}
					break
				case 2:
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.author < b.author)]
					} else {
						list = [...state.list.sort((a, b) => a.author > b.author)]
					}
					break
				default:
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.voteScore < b.voteScore)]
					} else {
						list = [...state.list.sort((a, b) => a.voteScore > b.voteScore)]
					}
			}

			return {
				...state,
				sortIndex: action.sortIndex,
				sortAscending,
				list,
			}
		case FETCH_POSTS:
			return {
				...state,
				list: [...action.posts.sort((a, b) => a.voteScore < b.voteScore)],
			}
		case FETCH_POST_DETAIL:
		case SUBMIT_POST:
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
		case SUBMIT_COMMENT:
			if (comments.filter(z => z.id === action.comment.id).length > 0) {
				comments = comments.map(z => {
					if (z.id === action.comment.id) {
						return action.comment
					}
					return z
				})
			} else {
				comments.push(action.comment)
			}

			return {
				...state,
				comments,
				// comment: { ...action.comment },
			}
		case VOTE_COMMENT:
			// TODO change vote score in comment
			comments = comments.map(z => {
				if (z.id === action.comment.id) {
					return action.comment
				}
				return z
			})

			return {
				...state,
				comments,
			}
		default:
			return state
	}
}

export default combineReducers({
	categories,
	posts,
});
