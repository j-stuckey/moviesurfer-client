import React, { Component } from 'react';
import { connect } from 'react-redux';

class LandingPage extends Component {
    render() {
        if (this.props.loggedIn) {
            return <h1>Logged in</h1>;
        } else {
            return <h1>Not Logged in</h1>;
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
