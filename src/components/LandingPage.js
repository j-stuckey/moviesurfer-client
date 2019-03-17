import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <div>
                {isLoggedIn && <Redirect to="/search" />}
                <h1>Not logged in.</h1>
                <h2>Welcome page still in development...</h2>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
