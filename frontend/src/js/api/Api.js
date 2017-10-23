import shortid from 'shortid'

class Api {
	constructor() {
		this.URL = 'http://localhost:3001'
	}

	/**
	 * Generate Option for fetch form
	 *
	 * @param method
	 * @param body
	 * @returns {*}
	 * @private
	 */
	_generateOption(method, body = {}) {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'fendy.jong',
		}

		switch (method) {
			case 'POST':
			case 'PUT':
				return {
					method,
					headers,
					body: JSON.stringify(body),
				}
			default:
				return {
					method,
					headers,
				}
		}
	}

	/**
	 * Fetch category list
	 *
	 * @returns {categories}
	 */
	fetchCategories() {
		return fetch(`${this.URL}/categories`, this._generateOption('GET'))
			.then(res => res.json())
			.then(data => data.categories)
	}

	/**
	 * Fetch posts
	 *
	 * @param category
	 * @returns {posts}
	 */
	fetchPosts(category) {
		return fetch(`${this.URL}${category !== '' ? `/${category}` : ''}/posts`, this._generateOption('GET'))
			.then(res => res.json())
	}

	/**
	 * Create new post
	 *
	 * @param title
	 * @param body
	 * @param author
	 * @param category
	 * @returns {post}
	 */
	newPost(title, body, author, category) {
		const option = this._generateOption('POST', {
			id: shortid.generate(),
			timestamp: Date.now(),
			title,
			body,
			author,
			category,
		})
		return fetch(`${this.URL}/posts`, option)
			.then(res => res.json())
	}

	/**
	 * Fetch post detail
	 *
	 * @param postId
	 * @returns {post}
	 */
	fetchPostDetail(postId) {
		return fetch(`${this.URL}/posts/${postId}`, this._generateOption('GET'))
			.then(res => res.json())
	}

	/**
	 * Vote post
	 *
	 * @param postId
	 * @param vote
	 * @returns {post}
	 */
	votePost(postId, vote) {
		const option = this._generateOption('POST', {
			option: vote,
		})
		return fetch(`${this.URL}/posts/${postId}`, option)
			.then(res => res.json())
	}

	/**
	 * Edit post
	 *
	 * @param postId
	 * @param title
	 * @param body
	 * @returns {post}
	 */
	editPost(postId, title, body) {
		const option = this._generateOption('PUT', {
			title,
			body,
		})
		return fetch(`${this.URL}/posts/${postId}`, option)
			.then(res => res.json())
	}

	/**
	 * Delete post
	 *
	 * @param postId
	 */
	deletePost(postId) {
		fetch(`${this.URL}/posts/${postId}`, this._generateOption('DELETE'))
	}

	/**
	 * Fetch comments in a post
	 *
	 * @param postId
	 * @returns {comments}
	 */
	fetchPostComments(postId) {
		return fetch(`${this.URL}/posts/${postId}/comments`, this._generateOption('GET'))
			.then(res => res.json() || [])
	}

	/**
	 * Insert new comment in a post
	 *
	 * @param body
	 * @param author
	 * @param postId
	 * @returns {comment}
	 */
	newComment(body, author, postId) {
		const option = this._generateOption('POST', {
			id: shortid.generate(),
			timestamp: Date.now(),
			body,
			author,
			parentId: postId,
		})
		return fetch(`${this.URL}/comments`, option)
			.then(res => res.json())
	}

	/**
	 * Fetch single comment
	 *
	 * @param commentId
	 * @returns {comment}
	 */
	fetchCommentDetail(commentId) {
		return fetch(`${this.URL}/comments/${commentId}`, this._generateOption('GET'))
			.then(res => res.json())
	}

	/**
	 * Vote comment
	 *
	 * @param commentId
	 * @param vote
	 * @returns {comment}
	 */
	voteComment(commentId, vote) {
		const option = this._generateOption('POST', {
			option: vote,
		})
		return fetch(`${this.URL}/comments/${commentId}`, option)
			.then(res => res.json())
	}

	/**
	 * Edit comment
	 *
	 * @param commentId
	 * @param body
	 * @returns {comment}
	 */
	editComment(commentId, body) {
		const option = this._generateOption('PUT', {
			timestamp: Date.now(),
			body,
		})
		return fetch(`${this.URL}/comments/${commentId}`, option)
			.then(res => res.json())
	}

	/**
	 * Delete comment
	 *
	 * @param commentId
	 */
	deleteComment(commentId) {
		fetch(`${this.URL}/comments/${commentId}`, this._generateOption('DELETE'))
	}
}

export default new Api()
