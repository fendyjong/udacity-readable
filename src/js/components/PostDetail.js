import React, { Component } from 'react'
import { connect } from 'react-redux'

import Moment from 'react-moment'

import * as actions from '../actions'
import Comments from './comments/Comments'
import Vote from './Vote'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'

import EditIcon from 'grommet/components/icons/base/Edit'
import TrashIcon from 'grommet/components/icons/base/Trash'

/**
 * Post detail component
 */
class PostDetail extends Component {
	/**
	 * Fetch single post after component have mounted
	 */
	componentDidMount() {
		const { match: { params } } = this.props

		this._fetchPostDetail(params.key)
	}

	/**
	 * Get postId from url location then
	 * Fetch single post
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps) {
		const { location, match: { params } } = nextProps

		if (location !== this.props.location) {
			this._fetchPostDetail(params.key)
		}

		if (nextProps.post.title === undefined) {
			nextProps.history.push('/page-not-found')
		}
	}

	/**
	 * Fetch single post
	 *
	 * @param key
	 * @private
	 */
	_fetchPostDetail(key) {
		this.props.fetchPost(key)
	}

	render() {
		const { post: { id, timestamp, title, body, author, category, voteScore }, votePost, deletePost } = this.props

		return (
			<div>
				<Header colorIndex='neutral-3'>
					<Box pad={{ 'horizontal': 'medium' }}
					     direction='row'
					     justify='between'
					     flex={true}>
						<Title>Post: {`${title}`}</Title>
						<Box direction='row'>
							<Button icon={<EditIcon />}
							        path={`/post/form/${id}`} />
							<Button icon={<TrashIcon />}
							        path='/posts/all'
							        onClick={() => deletePost(id)} />
						</Box>
					</Box>
				</Header>
				<Box margin='medium' pad='medium' colorIndex='light-2'>
					<Heading align='center'>{`${title}`}</Heading>
					<Heading align='center' tag='h3'>{`${author}`}</Heading>
					<Heading tag='h4'><Moment format='DD MMM YYYY'>{timestamp}</Moment></Heading>
					<Heading tag='h5'>Category: {`${category}`}</Heading>
					<Paragraph>{`${body}`}</Paragraph>
					<Vote voteScore={voteScore}
					      upVote={() => votePost(id, 'upVote')}
					      downVote={() => votePost(id, 'downVote')} />
				</Box>
				<Comments />
			</div>
		)
	}
}

const mapStateToProps = ({ posts: { post } }) => ({
	post,
})

export default connect(mapStateToProps, actions)(PostDetail)
