import Api from '../api/Api'

import { FETCH_POST_COMMENTS, SUBMIT_COMMENT, VOTE_COMMENT, SORT_COMMENTS } from './index'

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
