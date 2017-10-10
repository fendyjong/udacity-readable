import React, { Component } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'

import Moment from 'react-moment'

import { fetchPosts, postSortList } from '../actions/index'

import Article from 'grommet/components/Article'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import TableHeader from 'grommet/components/TableHeader'
import Button from 'grommet/components/Button'

import AddIcon from 'grommet/components/icons/base/Add'

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
		const { location, match: { params } } = nextProps

		if (location !== this.props.location) {
			this._receivePosts(params.category)
		}
	}

	/**
	 * Get posts list by category
	 *
	 * @param category
	 * @private
	 */
	_receivePosts(category) {
		const { receivePosts } = this.props

		if (category !== 'all') {
			receivePosts(category)
		} else {
			receivePosts()
		}
	}

	/**
	 * Select post by postId
	 *
	 * @param postId
	 * @private
	 */
	_onSelect(postId) {
		this.props.history.push(`/post/${postId}`)
	}

	render() {
		const { list, sortAscending, sortIndex, postSortList } = this.props

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
				       className='table-style'>
					<TableHeader labels={['Date', 'Title', 'Author', 'Vote']}
					             sortIndex={sortIndex}
					             sortAscending={sortAscending}
					             onSort={index => postSortList(index)} />
					<tbody>
						{list.map(post => (
							<TableRow key={shortid.generate()}
							          onClick={() => this._onSelect(post.id)}>
								<td><Moment format='DD MMM YYYY'>{post.timestamp}</Moment></td>
								<td>{post.title}</td>
								<td>{post.author}</td>
								<td>{post.voteScore}</td>
							</TableRow>
						))}
					</tbody>
				</Table>
			</Article>
		)
	}
}

const mapStateToProps = ({ posts: { list, sortAscending, sortIndex } }) => ({
	list,
	sortAscending,
	sortIndex,
})

const mapDispatchToProps = dispatch => ({
	receivePosts: category => dispatch(fetchPosts(category)),
	postSortList: sortIndex => dispatch(postSortList(sortIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
