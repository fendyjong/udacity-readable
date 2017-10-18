import Api from '../api/Api'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

/**
 * Select category
 *
 * @param category
 */
export const selectCategory = category => ({
	type: SELECT_CATEGORY,
	category,
})

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

/**
 * Fetch categories from server
 */
export const fetchCategories = () => (dispatch) => {
	Api.fetchCategories().then(data => dispatch({ type: FETCH_CATEGORIES, categories: data }))
}

export const POST_SORT_LIST = 'POST_SORT_LIST'

/**
 * Sort posts
 *
 * @param sortIndex
 */
export const postSortList = sortIndex => dispatch => {
	dispatch({ type: POST_SORT_LIST, sortIndex })
}

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL'
export const SUBMIT_POST = 'SUBMIT_POST'
export const VOTE_POST = 'VOTE_POST'

/**
 * Fetch posts by categories from server
 *
 * @param category
 */
export const fetchPosts = (category = '') => (dispatch) => {
	Api.fetchPosts(category).then(posts => dispatch({ type: FETCH_POSTS, posts }))
}

/**
 * Fetch single post from server
 *
 * @param key
 */
export const fetchPost = key => (dispatch) => {
	Api.fetchPostDetail(key).then(data => dispatch({ type: FETCH_POST_DETAIL, post: data }))
}

/**
 * Create new post or edit post in the server
 *
 * @param postId
 * @param title
 * @param body
 * @param author
 * @param category
 */
export const submitPost = (postId, title, body, author, category) => dispatch => {
	if (postId) {
		Api.editPost(postId, title, body).then(data => dispatch({ type: SUBMIT_POST, post: data }))
	} else {
		Api.newPost(title, body, author, category).then(data => dispatch({ type: SUBMIT_POST, post: data }))
	}
}

/**
 * Delete post in server
 *
 * @param postId
 */
export const deletePost = postId => dispatch => {
	Api.deletePost(postId)
}

/**
 * Up vote or down vote post in server
 *
 * @param key
 * @param vote
 */
export const votePost = (key, vote) => dispatch => {
	Api.votePost(key, vote).then(data => dispatch({ type: VOTE_POST, post: data }))
}

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const SORT_COMMENTS = 'SORT_COMMENTS'

/**
 * Fetch comments of a post from server
 *
 * @param key
 */
export const fetchPostComments = key => dispatch => {
	Api.fetchPostComments(key).then(data => dispatch({ type: FETCH_POST_COMMENTS, comments: data, postId: key }))
}

/**
 * Create new comment or edit comment in server
 *
 * @param commentId
 * @param comment
 * @param author
 * @param postId
 */
export const submitComment = (commentId, comment, author, postId) => dispatch => {
	if (commentId) {
		Api.editComment(commentId, comment).then(data => dispatch({ type: SUBMIT_COMMENT, comment: data }))
	} else {
		Api.newComment(comment, author, postId).then(data => dispatch({ type: SUBMIT_COMMENT, comment: data }))
	}
}

/**
 * Up vote or down vote comment in server
 *
 * @param key
 * @param vote
 */
export const voteComment = (key, vote) => dispatch => {
	Api.voteComment(key, vote).then(data => dispatch({ type: VOTE_COMMENT, comment: data }))
}

/**
 * Sort comments
 *
 * @param sort
 */
export const sortComments = sort => dispatch => {
	dispatch({ type: SORT_COMMENTS, sort })
}

/**
 * Delete comment in server
 *
 * @param commentId
 */
export const deleteComment = commentId => dispatch => {
	Api.deleteComment(commentId)
}
