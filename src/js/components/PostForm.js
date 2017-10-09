import React, { Component } from 'react'
import { connect } from 'react-redux'

import { submitPost, fetchPost } from '../actions/index'

import Form from 'grommet/components/Form'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'
import TextInput from 'grommet/components/TextInput'

class PostForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			postId: undefined,
			author: '',
			title: '',
			category: '',
			content: '',
			disabled: {
				author: '',
				category: '',
			},
		}

		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
	}

	componentWillMount() {
		const { match: { params }, post } = this.props

		if (params.postId === post.id) {
			this._setForm(post.id, post.author, post.title, post.category, post.body)
		}
	}

	componentWillReceiveProps(nextProps) {
		const { match: { params }, post } = nextProps

		if (params.postId !== '' && post.id === '') {
			this.props.fetchPost(params.postId)
		}

		if (params.postId !== this.props.post.id) {
			this._setForm(post.id, post.author, post.title, post.category, post.body)
		}
	}

	_setForm(postId, author, title, category, content) {
		console.log(postId)
		this.setState({
			postId,
			author,
			title,
			category,
			content,
			disabled: {
				author: 'disabled',
				category: 'disabled',
			},
		})
	}

	handleOnChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value

		this.setState({
			...this.state,
			[name]: value,
		})
	}

	handleOnSubmit(event) {
		const { submitPost } = this.props
		const { postId, author, title, category, content } = this.state

		event.preventDefault()

		submitPost(postId, title, content, author, category)
	}

	render() {
		const { author, title, category, content, disabled } = this.state

		return (
			<Form pad='medium'>
				<Header>
					<Heading>Edit Post</Heading>
				</Header>
				<FormFields>
					<FormField label='Title'>
						<TextInput value={title}
						           name='title'
						           onDOMChange={this.handleOnChange} />
					</FormField>
					<FormField label='Author'>
						<TextInput value={author}
						           name='author'
						           onDOMChange={this.handleOnChange}
						           disabled={disabled.author} />
					</FormField>
					<FormField label='Category'>
						<TextInput value={category}
						           name='category'
						           onDOMChange={this.handleOnChange}
						           disabled={disabled.category} />
					</FormField>
					<FormField label='Content'>
						<textarea rows='5'
						          value={content}
						          name='content'
						          onChange={this.handleOnChange} />
					</FormField>
				</FormFields>
				<Footer pad={{ vertical: 'medium' }}>
					<Button label='Save'
					        onClick={this.handleOnSubmit} />
				</Footer>
			</Form>
		)
	}

}

const mapStateToProps = ({ posts: { post } }) => ({
	post,
})

const mapDispatchToProps = dispatch => ({
	fetchPost: postId => dispatch(fetchPost(postId)),
	submitPost: (postId, title, body, author, category) => dispatch(submitPost(postId, title, body, author, category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
