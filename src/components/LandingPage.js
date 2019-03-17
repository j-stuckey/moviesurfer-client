import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        const { isLoggedIn } = this.props;
        console.log(isLoggedIn);
        return (
            <div>
                {isLoggedIn ? (
                    <Redirect to="/search" />
                ) : (
                    <div>
                        <h1>Not logged in.</h1>
                        <h2>Welcome page still in development...</h2>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
