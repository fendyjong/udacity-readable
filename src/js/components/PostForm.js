import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPost, submitPost } from '../actions/post'

import Form from 'grommet/components/Form'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'
import TextInput from 'grommet/components/TextInput'
import Select from 'grommet/components/Select'

/**
 * Post form component
 */
class PostForm extends Component {
	constructor(props) {
		super(props)

		// Initialize state
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

		if (params.postId !== undefined) {
			this.props.fetchPost(params.postId)
		}

		if (post.id !== undefined && params.postId === post.id) {
			this._setForm(post.id, post.author, post.title, post.category, post.body)
		}
	}

	componentWillReceiveProps(nextProps) {
		const { match: { params }, post } = nextProps

		if (params.postId !== undefined) {
			if (post.id === '') {
				this.props.fetchPost(params.postId)
			}

			if (post.id === undefined) {
				nextProps.history.push('/page-not-found')
			}

			if (params.postId !== this.props.post.id) {
				this._setForm(post.id, post.author, post.title, post.category, post.body)
			}
		}
	}

	_setForm(postId, author, title, category, content) {
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

	/**
	 * Handle on change form state
	 *
	 * @param event
	 */
	handleOnChange(event) {
		const target = event.target
		const name = target.name
		let value
		if (event.option) {
			value = event.option.value
		} else {
			value = target.value
		}

		this.setState({
			...this.state,
			[name]: value,
		})
	}

	/**
	 * Handle submit form
	 *
	 * @param event
	 */
	handleOnSubmit(event) {
		const { submitPost } = this.props
		const { postId, author, title, category, content } = this.state

		event.preventDefault()

		submitPost(postId, title, content, author, category)
	}

	render() {
		const { categories } = this.props
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
						<Select value={category}
						        name='category'
						        options={Object.values(categories).map(z => {
							        return { value: z.path, label: z.name }
						        })}
						        onChange={this.handleOnChange} />
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
					        path='/posts/all'
					        onClick={this.handleOnSubmit} />
				</Footer>
			</Form>
		)
	}
}

const mapStateToProps = ({ categories, posts: { post } }) => ({
	categories,
	post,
})

export default connect(mapStateToProps, { fetchPost, submitPost })(PostForm)
