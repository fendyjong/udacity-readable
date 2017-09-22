import React, { Component } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'

import Moment from 'react-moment'

import Article from 'grommet/components/Article'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'

import { fetchPosts } from '../actions/index'

class Posts extends Component {
  componentDidMount() {
    const { match: { params } } = this.props

    this._receivePosts(params.category)
  }

  componentWillReceiveProps(nextProps) {
    const { location, match: { params } } = nextProps

    if (location !== this.props.location) {
      this._receivePosts(params.category)
    }
  }

  _receivePosts(category) {
    const { receivePosts } = this.props

    if (category !== 'all') {
      receivePosts(category)
    } else {
      receivePosts()
    }
  }

  _onSelect(index) {
    const { posts } = this.props

    const post = posts.list[index]
    this.props.history.push(`/post/${post.id}`)
  }

  render() {
    const { posts } = this.props

    return (
      <Article>
        <Header colorIndex='neutral-3'>
          <Box pad={{ 'horizontal': 'medium' }}>
            <Title>Posts</Title>
          </Box>
        </Header>
        <Table selectable={true}
               onSelect={index => this._onSelect(index)}
               className='table-style'>
          <thead>
            <tr>
              <td>Date</td>
              <td>Title</td>
              <td>Author</td>
              <td>Vote</td>
            </tr>
          </thead>
          <tbody>
            {posts.list.map(post => (
              <TableRow key={shortid.generate()}>
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

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receivePosts: category => dispatch(fetchPosts(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
