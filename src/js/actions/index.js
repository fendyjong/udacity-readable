import Api from '../api/Api'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const selectCategory = category => ({
	type: SELECT_CATEGORY,
	category,
})

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const fetchCategories = () => (dispatch) => {
	Api.fetchCategories().then(data => dispatch({ type: FETCH_CATEGORIES, categories: data }))
}

export const POST_SORT_LIST = 'POST_SORT_LIST'

export const postSortList = sortIndex => dispatch => {
	dispatch({ type: POST_SORT_LIST, sortIndex })
}

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL'
export const SUBMIT_POST = 'SUBMIT_POST'
export const VOTE_POST = 'VOTE_POST'

export const fetchPosts = (category = '') => (dispatch) => {
	Api.fetchPosts(category).then(data => dispatch({ type: FETCH_POSTS, posts: data }))
}

export const fetchPost = key => (dispatch) => {
	Api.fetchPostDetail(key).then(data => dispatch({ type: FETCH_POST_DETAIL, post: data }))
}

export const submitPost = (postId, title, body, author, category) => dispatch => {
	if (postId) {
		Api.editPost(postId, title, body).then(data => dispatch({ type: SUBMIT_POST, post: data }))
	} else {
		Api.newPost(title, body, author, category).then(data => dispatch({ type: SUBMIT_POST, post: data }))
	}
}

export const votePost = (key, vote) => dispatch => {
	Api.votePost(key, vote).then(data => dispatch({ type: VOTE_POST, post: data }))
}

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const fetchPostComments = key => dispatch => {
	Api.fetchPostComments(key).then(data => dispatch({ type: FETCH_POST_COMMENTS, comments: data }))
}

export const submitComment = (commentId, comment, author, postId) => dispatch => {
	if (commentId) {
		Api.editComment(commentId, comment).then(data => dispatch({ type: SUBMIT_COMMENT, comment: data }))
	} else {
		Api.newComment(comment, author, postId).then(data => dispatch({ type: SUBMIT_COMMENT, comment: data }))
	}
}

export const voteComment = (key, vote) => dispatch => {
	Api.voteComment(key, vote).then(data => dispatch({ type: VOTE_COMMENT, comment: data }))
}
