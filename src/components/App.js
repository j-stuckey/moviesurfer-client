import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Search from './Search';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { NoMatch } from './NoMatch';
import { Header } from './Header';
import RegisterPage from './RegisterPage';

import PropTypes from 'prop-types';

export class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route path="/" component={Header}/>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={RegisterPage} />
                        <PrivateRoute
                            path="/search"
                            isLoggedIn={this.props.isLoggedIn}
                            component={Search}
                        />
                        <Route component={NoMatch} />
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);
