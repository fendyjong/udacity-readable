import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, receiveCategories } from '../actions/index';

class Main extends Component {

  componentDidMount() {
    this.props.receiveCategories()
  }

  render() {
    const { categories } = this.props

    console.log(categories)

    return (
      <div>
        {categories.map(key => (
          <div>{categories[key].name}</div>
        ))}
      </div>
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
