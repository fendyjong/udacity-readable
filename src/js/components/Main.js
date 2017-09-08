import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { fetchCategories } from '../actions/index'

import shortid from 'shortid'

import Split from 'grommet/components/Split'
import Sidebar from 'grommet/components/Sidebar'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Footer from 'grommet/components/Footer'

import Posts from './Posts'

class Main extends Component {
  componentDidMount() {
    this.props.receiveCategories()
  }

  render() {
    const { categories } = this.props

    return (
      <Split flex='right'>
        <Sidebar colorIndex='brand'
                 size='small'>
          <Header pad='medium'
                  justify='between'>
            <Title>
              Udacity Readable
            </Title>
          </Header>
          <Box flex='grow'
               justify='start'>
            <Menu primary={true}>
              {!categories || categories.categories.map(category => (
                <Anchor key={shortid.generate()}
                        path={`/${category.path}/posts`}>
                  {category.name}
                </Anchor>
              ))}
            </Menu>
          </Box>
          <Footer pad='medium'>
            &copy; 2017 zeven.io
          </Footer>
        </Sidebar>
        <Box>
          <Switch>
            <Redirect from='/' to='/all/posts' />
            <Route path='/:category/posts' component={Posts} />
          </Switch>
        </Box>
      </Split>
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
