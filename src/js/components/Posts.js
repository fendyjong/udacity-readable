import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    const { match, receivePosts } = this.props
console.log(this.props.match.params.category)
    if (!match.params.category) {
      console.log(match.params.category)
      receivePosts(match.params.category)
    } else {
      console.log('No')
      receivePosts()
    }
  }

  _onSelect(index) {
    console.log(this.props.posts.posts[index])
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
            {!posts || posts.posts.map(post => (
              <TableRow key={post.id}>
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
    receivePosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
