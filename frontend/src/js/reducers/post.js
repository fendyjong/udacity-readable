import {
	POST_SORT_LIST, FETCH_POST_DETAIL, FETCH_POSTS, VOTE_POST, SUBMIT_POST,
	FETCH_POST_COMMENTS, SUBMIT_COMMENT, VOTE_COMMENT, SORT_COMMENTS,
} from '../actions/index'

/**
 * Initial state of post redux state
 *
 * @type {{sortAscending: boolean, sortIndex: number, list: Array, post: {id: string, timestamp: string, title: string, body: string, author: string, category: string, voteScore: string, deleted: boolean}, comments: Array}}
 */
const initialPosts = {
	sortAscending: false,
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

/**
 * Posts redux state
 *
 * @param state
 * @param action
 * @returns {*}
 */
export const posts = (state = initialPosts, action) => {
	let comments = [...state.comments]

	switch (action.type) {
		case POST_SORT_LIST:
			let list
			const sortAscending = !state.sortAscending
			switch (action.sortIndex) {
				case 0:
					// Title
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.title > b.title)]
					} else {
						list = [...state.list.sort((a, b) => a.title < b.title)]
					}
					break
				case 1:
					// Author
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.author > b.author)]
					} else {
						list = [...state.list.sort((a, b) => a.author < b.author)]
					}
					break
				case 2:
					// No of Comments
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.author > b.author)]
					} else {
						list = [...state.list.sort((a, b) => a.author < b.author)]
					}
					break
				default:
					// Vote
					if (sortAscending) {
						list = [...state.list.sort((a, b) => a.voteScore > b.voteScore)]
					} else {
						list = [...state.list.sort((a, b) => a.voteScore < b.voteScore)]
					}
			}

			return {
				...state,
				sortIndex: action.sortIndex,
				sortAscending,
				list,
			}
		case FETCH_POSTS:
			const posts = [...action.posts.filter(z => !z.deleted)]

			return {
				...state,
				list: [...posts.sort((a, b) => a.voteScore < b.voteScore)],
			}
		case FETCH_POST_DETAIL:
		case SUBMIT_POST:
			return {
				...state,
				post: { ...action.post },
			}
		case VOTE_POST:
			// update list voteScore
			list = state.list.map(z => {
				if (z.id === action.post.id) {
					z.voteScore = action.post.voteScore
				}
				return z
			})

			return {
				...state,
				list,
				post: { ...action.post },
			}
		case FETCH_POST_COMMENTS:
			comments = [...action.comments]
			comments = comments.sort((a, b) => a.voteScore < b.voteScore)

			list = state.list.map(post => {
				if (post.id === action.postId) {
					post.noOfComments = comments.length
				}
				return post
			})

			return {
				...state,
				list,
				comments: [...comments],
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
		case SORT_COMMENTS:
			const sort = action.sort

			switch (sort.value) {
				case 'Date':
					switch (sort.direction) {
						case 'desc':
							comments = comments.sort((a, b) => a.timestamp > b.timestamp)
							break
						default:
							comments = comments.sort((a, b) => a.timestamp < b.timestamp)
					}
					break
				default:
					switch (sort.direction) {
						case 'desc':
							comments = comments.sort((a, b) => a.voteScore > b.voteScore)
							break
						default:
							comments = comments.sort((a, b) => a.voteScore < b.voteScore)
					}
			}

			return {
				...state,
				comments,
			}
		default:
			return state
	}
}

export default posts
