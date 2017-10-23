import React, { Component } from 'react'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Value from 'grommet/components/Value'

import DislikeIcon from 'grommet/components/icons/base/Dislike'
import LikeIcon from 'grommet/components/icons/base/Like'

/**
 * Re-usable vote component
 *
 * Used in post and comment
 */
class Vote extends Component {
	render() {
		const { upVote, downVote, voteScore } = this.props

		return (
			<Box direction='row'>
				<Value value={voteScore} />
				<Button icon={<LikeIcon />} onClick={upVote} />
				<Button icon={<DislikeIcon />} onClick={downVote} />
			</Box>
		)
	}
}

export default Vote
