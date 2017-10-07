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

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL'

export const fetchPosts = (category = '') => (dispatch) => {
	Api.fetchPosts(category).then(data => dispatch({ type: FETCH_POSTS, posts: data }))
}

export const fetchPost = key => (dispatch) => {
	Api.fetchPostDetail(key).then(data => dispatch({ type: FETCH_POST_DETAIL, post: data }))
}

export const VOTE_POST = 'VOTE_POST'

export const votePost = (key, vote) => dispatch => {
	Api.votePost(key, vote).then(data => dispatch({ type: VOTE_POST, post: data }))
}

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const POST_COMMENT = 'POST_COMMENT'

export const fetchPostComments = key => dispatch => {
	Api.fetchPostComments(key).then(data => dispatch({ type: FETCH_POST_COMMENTS, comments: data }))
}

export const newComment = (comment, author, postId) => dispatch => {
	Api.newComment(comment, author, postId).then(data => dispatch({ type: POST_COMMENT, comment: data }))
}
