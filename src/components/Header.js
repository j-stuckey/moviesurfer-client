import React from 'react';
import styles from './styles/Header.module.css';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';
import { BurgerMenu } from './BurgerMenu';
import buttonStyles from './styles/button.module.css';

import PropTypes from 'prop-types';

export class Header extends React.Component {
    logOut = event => {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    };

    render() {
        return (
            <header className={styles.header}>
                <nav
                    className={
                        this.props.isLoggedIn
                            ? styles.mainNavLeft
                            : styles.mainNav
                    }
                >
                    <Link to="/" className={styles.logo}>
                        <img
                            src={require('../assets/home.png')}
                            alt="home icon"
                        />
                    </Link>
                    {this.props.isLoggedIn ? (
                        <span>
                            <button
                                onClick={this.logOut}
                                type="button"
                                className={buttonStyles.logoutButton}
                            >
                                Logout
                            </button>
                            <BurgerMenu />
                        </span>
                    ) : (
                        <span>
                            <span className={styles.linksContainer}>
                                <Link
                                    className={`${styles.topLink}`}
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className={`${styles.topLink}`}
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </span>

                            <BurgerMenu>
                                <Link className={styles.links} to="/login">
                                    Login
                                </Link>
                                <Link className={styles.links} to="/register">
                                    Register
                                </Link>
                            </BurgerMenu>
                        </span>
                    )}
                </nav>
            </header>
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
