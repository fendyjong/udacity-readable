import React, { Component } from 'react'
import { connect } from 'react-redux'

import moment from 'moment'

import { fetchPostComments, newComment, voteComment } from '../actions/index'
import Vote from './Vote'

import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Form from 'grommet/components/Form'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import Markdown from 'grommet/components/Markdown'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import TextInput from 'grommet/components/TextInput'
import Label from 'grommet/components/Label'
import Timestamp from 'grommet/components/Timestamp'

class PostComments extends Component {
	constructor(props) {
		super(props)

		this.state = {
			form: {
				author: '',
				comment: '',
			},
		}

		this._handleOnChange = this._handleOnChange.bind(this)
		this._handleOnSubmit = this._handleOnSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		const { post } = nextProps

		if (this.props.post.id !== post.id) {
			this.props.fetchPostComments(post.id)
		}
	}

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

	_handleOnSubmit(event) {
		const { id } = this.props.post
		const { author, comment } = this.state.form

		event.preventDefault()
		this.props.newComment(comment, author, id)
	}

	render() {
		const { comments, voteComment } = this.props
		const { form } = this.state

		return (
			<Box margin='medium' pad='medium'>
				<List>
					{Object.keys(comments).map(key => (
						<ListItem key={comments[key].id}
						          pad={{ horizontal: 'medium' }}>
							<Box pad='none'>
								<Markdown content={comments[key].body} />
								<Label>{`By: ${comments[key].author} - ${moment(comments[key].timestamp).format('DD MMM YYYY')}`}</Label>
								<Vote voteScore={comments[key].voteScore}
								      upVote={() => voteComment(comments[key].id, 'upVote')}
								      downVote={() => voteComment(comments[key].id, 'downVote')} />
							</Box>
						</ListItem>
					))}
				</List>
				<Form>
					<Header>
						<Heading>Comments</Heading>
					</Header>
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

const mapStateToProps = ({ posts: { post, comments } }) => ({
	post,
	comments,
})

const mapDispatchToProps = dispatch => ({
	fetchPostComments: key => dispatch(fetchPostComments(key)),
	newComment: (comment, author, postId) => dispatch(newComment(comment, author, postId)),
	voteComment: (key, vote) => dispatch(voteComment(key, vote)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostComments)
