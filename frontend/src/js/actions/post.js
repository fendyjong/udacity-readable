import Api from '../api/Api'

import { POST_SORT_LIST, FETCH_POSTS, FETCH_POST_DETAIL, SUBMIT_POST, VOTE_POST } from './index'
import { fetchPostComments } from './comment'

/**
 * Sort posts
 *
 * @param sortIndex
 */
export const postSortList = sortIndex => dispatch => {
	dispatch({ type: POST_SORT_LIST, sortIndex })
}

/**
 * Fetch posts by categories from server
 *
 * @param category
 */
export const fetchPosts = (category = '') => (dispatch) => {
	Api.fetchPosts(category).then(posts => {
		posts.map(post => dispatch(fetchPostComments(post.id)))
		dispatch({ type: FETCH_POSTS, posts })
	})
}

/**
 * Fetch single post from server
 *
 * @param key
 */
export const fetchPost = key => dispatch => {
	Api.fetchPostDetail(key).then(post => dispatch({ type: FETCH_POST_DETAIL, post }))
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
