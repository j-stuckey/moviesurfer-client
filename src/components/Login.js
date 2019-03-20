import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

import LoginStyles from './styles/Login.module.css';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props
            .dispatch(login(this.state.username, this.state.password))
            .then(() => this.props.history.push('/search'));
    }

    render() {
        const { username, password } = this.state;
        const isEnabled = username.length > 0 && password.length > 0;

        return (
            <form
                id="login"
                onSubmit={this.handleSubmit}
                className={LoginStyles.form}
            >
                <fieldset className={LoginStyles.fieldset}>
                    <legend>Login</legend>

                    {this.props.error && <p>{this.props.error}</p>}

                    <label htmlFor="username" />
                    <input
                        className={LoginStyles.inputs}
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleUsername}
                    />

                    <label htmlFor="password" />
                    <input
                        className={LoginStyles.inputs}
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                    />

                    <button
                        type="submit"
                        disabled={!isEnabled}
                        className={LoginStyles.submit}
                    >
                        Login
                    </button>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    };
};

export default connect(mapStateToProps)(Login);
