import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './LandingPage'

class App extends Component {
    render() {
        return (
            <Router>
				<Route exact path="/" render={() => <LandingPage loggedIn={this.props.loggedIn}/>} />
			</Router>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);
