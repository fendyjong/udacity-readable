import React, { Component } from 'react'

import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Headline from 'grommet/components/Headline'

class PageNotFound extends Component {
	render() {
		return (
			<Box pad='medium'
			     justify='center'
			     align='center'>
				<Headline>404</Headline>
				<Heading>Page Not Found</Heading>
			</Box>
		)
	}
}

export default (PageNotFound)
