import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/auth';
import LoginStyles from './styles/Login.module.css';
import ButtonStyles from './styles/button.module.css';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import PulseLoader from 'react-spinners/PulseLoader';

const override = css`
    display: block;
    margin: 70px auto;
    border-color: red;
`;

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
            <React.Fragment>
                {this.props.isLoggedIn && <Redirect to="/search" />}
                {this.props.loading ? <PulseLoader
                    css={override}
                    sizeUnit={'px'}
                    size={20}
                    color={'#51b9f5'}
                    loading={this.props.loading}
                /> : 
                    <React.Fragment>
                        <form
                            id="login"
                            onSubmit={this.handleSubmit}
                            className={LoginStyles.form}
                        >
                            <fieldset className={LoginStyles.fieldset}>
                                <legend className={LoginStyles.title}>Login</legend>

                                {this.props.error && <p>{this.props.error}</p>}

                                <label htmlFor="username" />
                                <input
                                    className={LoginStyles.inputs}
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />

                                <label htmlFor="password" />
                                <input
                                    className={LoginStyles.inputs}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />

                                <button
                                    type="submit"
                                    disabled={!isEnabled}
                                    className={`${LoginStyles.submit} ${
                                        ButtonStyles.registerButton
                                    }`}
                                >
                            Login
                                </button>
                            </fieldset>
                        </form>
                        <Link to="/register" className={LoginStyles.registerLink}>
                    Don't have an account? Register here.
                        </Link>
                    </React.Fragment>
                }
				
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isLoggedIn: state.auth.currentUser !== null,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps)(Login);
