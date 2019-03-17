import React, { Component } from 'react';
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

export default App;
