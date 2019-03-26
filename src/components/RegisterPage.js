import React, { Component } from 'react';
import styles from './styles/Register.module.css';

export class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            touched: {
                username: false,
                password: false,
                confirmPassword: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let change = {};

        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    validate(username, password, confirmPassword) {
        // true means invalid, so our conditions got reversed
        return {
            username: username.length === 0,
            password: password.length === 0,
            confirmPassword: confirmPassword.length === 0
        };
    }

    // passes in the text field,
    // the event for blurring
    handleBlur = field => event => {
        this.setState({
            touched: {
                ...this.state.touched,

                [field]: true
            }
        });
    };

    render() {
        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };

        const errors = this.validate(
            this.state.username,
            this.state.password,
            this.state.confirmPassword
        );
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label htmlFor="username">Username</label>
                    <input
                        className={
                            shouldMarkError('username') ? styles.error : ''
                        }
                        onBlur={this.handleBlur('username')}
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className={
                            shouldMarkError('password') ? styles.error : ''
                        }
                        onBlur={this.handleBlur('password')}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className={
                            shouldMarkError('confirmPassword')
                                ? styles.error
                                : ''
                        }
                        onBlur={this.handleBlur('confirmPassword')}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />

                    <button type="submit" disabled={!isEnabled}>
                        Submit
                    </button>
                </fieldset>
            </form>
        );
    }
}

export default RegisterPage;
