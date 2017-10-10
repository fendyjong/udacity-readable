import shortid from 'shortid'

class Api {
	constructor() {
		this.URL = 'http://localhost:3001'
	}

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

	fetchCategories() {
		return fetch(`${this.URL}/categories`, this._generateOption('GET'))
			.then(res => res.json())
			.then(data => data.categories)
	}

	fetchPosts(category) {
		return fetch(`${this.URL}${category !== '' ? `/${category}` : ''}/posts`, this._generateOption('GET'))
			.then(res => res.json())
	}

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

	fetchPostDetail(postId) {
		return fetch(`${this.URL}/posts/${postId}`, this._generateOption('GET'))
			.then(res => res.json())
	}

	votePost(postId, vote) {
		const option = this._generateOption('POST', {
			option: vote,
		})
		return fetch(`${this.URL}/posts/${postId}`, option)
			.then(res => res.json())
	}

	editPost(postId, title, body) {
		const option = this._generateOption('PUT', {
			title,
			body,
		})
		return fetch(`${this.URL}/posts/${postId}`, option)
			.then(res => res.json())
	}

	deletePost(postId) {
		return fetch(`${this.URL}/posts/${postId}`, this._generateOption('DELETE'))
			.then(res => res.json())
	}

	fetchPostComments(postId) {
		return fetch(`${this.URL}/posts/${postId}/comments`, this._generateOption('GET'))
			.then(res => res.json() || [])
	}

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

	fetchCommentDetail(commentId) {
		return fetch(`${this.URL}/comments/${commentId}`, this._generateOption('GET'))
			.then(res => res.json())
	}

	voteComment(commentId, vote) {
		const option = this._generateOption('POST', {
			option: vote,
		})
		return fetch(`${this.URL}/comments/${commentId}`, option)
			.then(res => res.json())
	}

	editComment(commentId, body) {
		const option = this._generateOption('PUT', {
			timestamp: Date.now(),
			body,
		})
		return fetch(`${this.URL}/comments/${commentId}`, option)
			.then(res => res.json())
	}

	deleteComment(commentId) {
		return fetch(`${this.URL}/comments/${commentId}`, this._generateOption('DELETE'))
			.then(res => res.json())
	}
}

export default new Api()
