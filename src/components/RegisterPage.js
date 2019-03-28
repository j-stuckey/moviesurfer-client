import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, passwordsMatch, length } from '../validators';
import Input from './Input';
import { registerUser } from '../actions/users';
import PropTypes from 'prop-types';

const passwordLength = length({ min: 8, max: 72 });
const usernameLength = length({ min: 3, max: 32 });

class RegisterPage extends Component {
    constructor(props){
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
            <main>
                <form
                    onSubmit={this.props.handleSubmit(values =>
                        this.handleFormSubmit(values)
                    )}
                >
                    <fieldset>
                        <legend>Register</legend>
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
                        <button type="submit">
                            Sign up
                        </button>
                    </fieldset>
                </form>

                <Link to="/login">
                    Already have an account? Login here.
                </Link>
            </main>
        );
    }
}

RegisterPage.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	
});

RegisterPage = connect(mapStateToProps)(RegisterPage);

export default reduxForm({
    form: 'RegisterPage'
})(RegisterPage);
