import React, { Component } from 'react'
import { connect } from 'react-redux'

import Moment from 'react-moment'

import { fetchPost, votePost } from '../actions';
import PostComments from './PostComments'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Value from 'grommet/components/Value'
import Button from 'grommet/components/Button'

import DislikeIcon from 'grommet/components/icons/base/Dislike'
import LikeIcon from 'grommet/components/icons/base/Like'

class PostDetail extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { match: { params } } = this.props

		this._fetchPostDetail(params.key)
		this._fetchComments(params.key)
	}

	componentWillReceiveProps(nextProps) {
		const { location, match: { params } } = nextProps

		if (location !== this.props.location) {
			this._fetchPostDetail(params.key)
			this._fetchComments(params.key)
		}
	}

	_fetchPostDetail(key) {
		this.props.fetchPost(key)
	}

	_fetchComments(key) {
		// TODO fetch comments
	}

	render() {
		const { post: { id, timestamp, title, body, author, category, voteScore, deleted }, votePost } = this.props

		return (
			<div>
				<Header colorIndex='neutral-3'>
					<Box pad={{ 'horizontal': 'medium' }}>
						<Title>Post: {`${title}`}</Title>
					</Box>
				</Header>
				<Box margin='medium' pad='medium' colorIndex='light-2'>
					<Heading align='center'>{`${title}`}</Heading>
					<Heading align='center' tag='h3'>{`${author}`}</Heading>
					<Heading tag='h4'><Moment format='DD MMM YYYY'>{timestamp}</Moment></Heading>
					<Heading tag='h5'>Category: {`${category}`}</Heading>
					<Paragraph>{`${body}`}</Paragraph>
					<Box direction='row'>
						<Value value={voteScore} label='Vote Score' />
						<Button icon={<LikeIcon />} onClick={() => votePost(id, 'upVote')} />
						<Button icon={<DislikeIcon />} onClick={() => votePost(id, 'downVote')} />
					</Box>
				</Box>
				<PostComments />
			</div>
		)
	}
}

function mapStateToProps({ posts: { post } }) {
	return {
		post,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPost: key => dispatch(fetchPost(key)),
		votePost: (key, vote) => dispatch(votePost(key, vote)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
