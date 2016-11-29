import React from 'react'
import Chart from './LineChart'

export default React.createClass({

	getInitialState() {
		return {
			data: require('json!./data.json')
		}
	},

	render() {
  	return (
			<div>
				<p>This is some container component</p>
				<Chart data={ this.state.data } />
			</div>
    )
  }
})
