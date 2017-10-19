import React, { Component } from 'react'
import { connect } from 'react-redux'

import { submitComment } from '../../actions/comment'
import CommentList from './CommentList'

import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Form from 'grommet/components/Form'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import TextInput from 'grommet/components/TextInput'


/**
 * Main comments component
 */
class Comments extends Component {
	constructor(props) {
		super(props)

		// initialize state
		this.state = {
			form: {
				author: '',
				comment: '',
			},
			hideEditCommentLayer: true,
		}

		this._handleOnChange = this._handleOnChange.bind(this)
		this._handleOnSubmit = this._handleOnSubmit.bind(this)
	}

	/**
	 * Handle on change form state
	 *
	 * @param event
	 * @private
	 */
	_handleOnChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value

		this.setState({
			form: {
				...this.state.form,
				[name]: value,
			},
		})
	}

	/**
	 * Handle submit form
	 * Create new comment
	 *
	 * @param event
	 * @private
	 */
	_handleOnSubmit(event) {
		const { id } = this.props.post
		const { author, comment } = this.state.form

		event.preventDefault()
		this.props.newComment(comment, author, id)

		this.setState({
			form: {
				author: '',
				comment: '',
			},
		})
	}

	render() {
		const { form } = this.state

		return (
			<Box margin='medium' pad='medium'>
				<Header>
					<Heading>Comments</Heading>
				</Header>
				<CommentList />
				<Form>
					<FormFields>
						<FormField label='Author'>
							<TextInput name='author'
							           value={form.author}
							           onDOMChange={this._handleOnChange} />
						</FormField>
						<FormField label='Comment'>
							<textarea name='comment'
							          value={form.comment}
							          onChange={this._handleOnChange}
							          rows='3' />
						</FormField>
					</FormFields>
					<Footer pad={{ vertical: 'small' }}>
						<Button label='Comment'
						        onClick={this._handleOnSubmit} />
					</Footer>
				</Form>
			</Box>
		)
	}
}

const mapStateToProps = ({ posts: { post } }) => ({
	post,
})

const mapDispatchToProps = dispatch => ({
	newComment: (comment, author, postId) => dispatch(submitComment(undefined, comment, author, postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
