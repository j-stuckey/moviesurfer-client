import React, { Component } from 'react';

class LandingPage extends Component {

	render() {
		if (this.props.loggedIn) {
			return <h1>Logged in</h1>
		} else {
			return null
		}
	}
}

export default LandingPage