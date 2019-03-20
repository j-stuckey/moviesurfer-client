import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import buttonStyles from './styles/button.module.css';

export class LandingPage extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <div>
                {isLoggedIn && <Redirect to="/search" />}
                <div id="welcome-page">
                    <h1>Welcome to Moviesurfer!</h1>
                    <p>Welcome page still in development...</p>

                    <Link to="/register" className={buttonStyles.registerButton}>Sign Up</Link>
                    <Link to="/login" className={buttonStyles.registerButton}>Login</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
