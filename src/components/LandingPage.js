import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <div>
                {isLoggedIn && <Redirect to="/search" />}
                <h1>Welcome to Moviesurfer!</h1>
                <p>Welcome page still in development...</p>

                <Link to="/register">Sign Up</Link>
				<Link to="/login">Login</Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
