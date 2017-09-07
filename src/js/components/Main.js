import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/index';

class Main extends Component {
  render() {
    const { receiveCategories } = this.props

    receiveCategories()

    return (
      <div>Hello World</div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receiveCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
