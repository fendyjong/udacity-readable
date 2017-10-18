import React, { Component } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'

import * as actions from '../actions'
import Vote from './Vote'

import Article from 'grommet/components/Article'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import TableHeader from 'grommet/components/TableHeader'
import Button from 'grommet/components/Button'
import Anchor from 'grommet/components/Anchor'

import AddIcon from 'grommet/components/icons/base/Add'
import EditIcon from 'grommet/components/icons/base/Edit'
import TrashIcon from 'grommet/components/icons/base/Trash'

/**
 * Posts list component
 */
class Posts extends Component {
	/**
	 * Get posts list by category
	 */
	componentDidMount() {
		const { match: { params } } = this.props

		this._receivePosts(params.category)
	}

	/**
	 * Get posts list by category
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps) {
		const { location, match: { params }, list, comments, fetchPostComments } = nextProps

		if (location !== this.props.location) {
			this._receivePosts(params.category)
		}

		if (list !== this.props.list) {
			// get no of comments
			list.map(post => fetchPostComments(post.id))
		}
	}

	/**
	 * Get posts list by category
	 *
	 * @param category
	 * @private
	 */
	_receivePosts(category) {
		const { fetchPosts } = this.props

		if (category !== 'all') {
			fetchPosts(category)
		} else {
			fetchPosts()
		}
	}

	render() {
		const { list, sortAscending, sortIndex, postSortList, votePost, deletePost } = this.props

		return (
			<Article>
				<Header colorIndex='neutral-3'>
					<Box pad={{ horizontal: 'medium' }}
					     direction='row'
					     justify='between'
					     flex={true}>
						<Title>Posts</Title>
						<Button icon={<AddIcon />}
						        path='/post/form' />
					</Box>
				</Header>
				<Table selectable={true}
				       selected={-1}
				       className='table-style'>
					<TableHeader labels={['Title', 'Author', 'Comments', 'Vote', '']}
					             sortIndex={sortIndex}
					             sortAscending={sortAscending}
					             onSort={index => postSortList(index)} />
					<tbody>
						{list.map(post => (
							<TableRow key={shortid.generate()}>
								<td><Anchor path={`/post/${post.id}`} label={post.title} /></td>
								<td>{post.author}</td>
								<td>{post.noOfComments}</td>
								<td><Vote voteScore={post.voteScore}
								          upVote={() => votePost(post.id, 'upVote')}
								          downVote={() => votePost(post.id, 'downVote')} /></td>
								<td><Button icon={<EditIcon />}
								            path={`/post/form/${post.id}`} />
									<Button icon={<TrashIcon />}
									        path='/posts/all'
									        onClick={() => deletePost(post.id)} /></td>
							</TableRow>
						))}
					</tbody>
				</Table>
			</Article>
		)
	}
}

const mapStateToProps = ({ posts: { list, comments, sortAscending, sortIndex } }) => ({
	list,
	comments,
	sortAscending,
	sortIndex,
})

export default connect(mapStateToProps, actions)(Posts)
