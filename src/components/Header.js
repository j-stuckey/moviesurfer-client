import React from 'react';
import styles from './styles/Header.module.css';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';
import { BurgerMenu } from './BurgerMenu';
import buttonStyles from './styles/button.module.css';
import MediaQuery from 'react-responsive';

import PropTypes from 'prop-types';

export class Header extends React.Component {
    logOut = event => {
        this.props.dispatch(clearAuth());
        clearAuthToken();
        this.props.history.push('/login');
    };

    render() {
        return (
            <nav
                className={
                    this.props.isLoggedIn ? styles.mainNavLeft : styles.mainNav
                }
            >
                <Link to="/" className={styles.logo}>
                    <img src={require('../assets/home.png')} alt="home icon" />
                </Link>
                {this.props.isLoggedIn ? (
                    <React.Fragment>
                        <button
                            onClick={this.logOut}
                            type="button"
                            className={buttonStyles.logoutButton}
                        >
                            Logout
                        </button>
                        <MediaQuery query="(max-width: 400px)">
                            <BurgerMenu>
                                <Link to="/">Home</Link>
                                <Link to="/test">Test</Link>
                            </BurgerMenu>
                        </MediaQuery>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <MediaQuery query="(min-width: 400px)">
                            <Link className={`${styles.topLink}`} to="/login">
                                Login
                            </Link>
                            <Link
                                className={`${styles.topLink}`}
                                to="/register"
                            >
                                Register
                            </Link>
                        </MediaQuery>

                        <MediaQuery query="(max-width: 400px)">
                            <BurgerMenu>
                                <Link className={styles.links} to="/login">
                                    Login
                                </Link>
                                <Link className={styles.links} to="/register">
                                    Register
                                </Link>
                            </BurgerMenu>
                        </MediaQuery>
                    </React.Fragment>
                )}
            </nav>
        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.currentUser !== null,
        currentUser: state.auth.currentUser
    };
};

export default connect(mapStateToProps)(Header);
