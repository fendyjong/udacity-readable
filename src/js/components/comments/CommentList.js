import React, { Component } from 'react'
import { connect } from 'react-redux'

import moment from 'moment'

import { fetchPostComments, submitComment, voteComment } from '../../actions/index'
import Vote from '../Vote'

import Card from 'grommet/components/Card'
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'
import Layer from 'grommet/components/Layer'
import Form from 'grommet/components/Form'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import TextInput from 'grommet/components/TextInput'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'

class CommentList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			commentId: '',
			form: {
				author: '',
				comment: '',
			},
			hideEditCommentLayer: true,
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
		const { commentId, form: { comment } } = this.state

		event.preventDefault()
		this.props.editComment(commentId, comment)

		this.setState({
			hideEditCommentLayer: true,
		})
	}

	openComment(commentId) {
		// fetch comment
		const comment = this.props.comments.filter(z => z.id === commentId)[0]

		this.setState({
			commentId,
			form: {
				author: comment.author,
				comment: comment.body,
			},
			hideEditCommentLayer: false,
		})
	}

	render() {
		const { comments, voteComment } = this.props
		const { form, hideEditCommentLayer } = this.state

		return (<div>
			{comments.map(comment => (
				<Card key={comment.id}
				      className='full'
				      label={`${moment(comment.timestamp).format('DD MMM YYYY')} - ${comment.author}`}
				      description={comment.body}
				      link={
					      <Box direction='row'
					           pad={{ between: 'large' }}
					           align='center'>
						      <Vote voteScore={comment.voteScore}
						            upVote={() => voteComment(comment.id, 'upVote')}
						            downVote={() => voteComment(comment.id, 'downVote')} />
						      <Box direction='row'
						           pad={{ between: 'small' }}>
							      <Anchor label='edit'
							              onClick={() => {
								              this.openComment(comment.id)
							              }} />
							      <Anchor label='delete'
							              onClick={() => {

							              }} />
						      </Box>
					      </Box>
				      } />
			))}
			<Layer closer={true}
			       hidden={hideEditCommentLayer}
			       onClose={() => {
				       this.setState({
					       hideEditCommentLayer: true,
				       })
			       }}>
				<Form>
					<Header>
						<Heading>Edit Comment</Heading>
					</Header>
					<FormFields>
						<FormField label='Author'>
							<TextInput name='author'
							           value={form.author}
							           disabled='disabled'
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
						<Button label='Edit'
						        onClick={this._handleOnSubmit} />
					</Footer>
				</Form>
			</Layer>
		</div>)
	}
}

const mapStateToProps = ({ posts: { post, comments } }) => ({
	post,
	comments,
})

const mapDispatchToProps = dispatch => ({
	fetchPostComments: key => dispatch(fetchPostComments(key)),
	editComment: (commentId, comment) => dispatch(submitComment(commentId, comment)),
	voteComment: (key, vote) => dispatch(voteComment(key, vote)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
