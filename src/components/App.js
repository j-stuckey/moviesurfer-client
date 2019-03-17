import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Search from './Search';
import PrivateRoute from './PrivateRoute'

import AppStyles from './styles/App.module.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className={AppStyles.background}>
                    <Route exact path="/" component={LandingPage} />
					<PrivateRoute path="/search" isLoggedIn={this.props.isLoggedIn} component={Search}/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);
