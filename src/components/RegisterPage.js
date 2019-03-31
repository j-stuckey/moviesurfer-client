import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, passwordsMatch, length } from '../validators';
import Input from './Input';
import { registerUser } from '../actions/users';
import PropTypes from 'prop-types';
import ButtonStyles from './styles/button.module.css';
import styles from './styles/RegisterPage.module.css';

const passwordLength = length({ min: 8, max: 72 });
const usernameLength = length({ min: 3, max: 32 });

class RegisterPage extends Component {
    constructor(props) {
        super(props);
    }
    handleFormSubmit = values => {
        const user = values;

        this.props
            .dispatch(registerUser(user))
            .then(() => this.props.history.push('/search'));
    };

    render() {
        return (
            <React.Fragment>
                <form
                    onSubmit={this.props.handleSubmit(values =>
                        this.handleFormSubmit(values)
                    )}
                    className={styles.form}
                >
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.title}>Register</legend>
                        <Field
                            name="username"
                            type="text"
                            component={Input}
                            placeholder="Username"
                            validate={[required, usernameLength]}
                        />
                        <Field
                            name="password"
                            type="password"
                            component={Input}
                            placeholder="Password"
                            validate={[required, passwordLength]}
                        />
                        <Field
                            name="confirmPassword"
                            type="password"
                            component={Input}
                            placeholder="Confirm Password"
                            validate={[
                                required,
                                passwordsMatch,
                                passwordLength
                            ]}
                        />
                        <button
                            type="submit"
                            className={`${styles.submit} ${
                                ButtonStyles.registerButton
                            }`}
                        >
                            Sign up
                        </button>
                    </fieldset>
                </form>

                <Link to="/login" className={styles.link}>
                    Already have an account? Login here.
                </Link>
            </React.Fragment>
        );
    }
}

RegisterPage.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

RegisterPage = connect(mapStateToProps)(RegisterPage);

export default reduxForm({
    form: 'RegisterPage'
})(RegisterPage);
