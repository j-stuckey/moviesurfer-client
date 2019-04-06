import React from 'react';
import { connect } from 'react-redux';
import { fetchResults } from '../actions/search';

import styles from './styles/Search.module.css';
import glass from '../assets/magnifying-glass.png';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { searchTerm } = this.state;
        dispatch(fetchResults(searchTerm));
    }

    render() {
        return (
            <div className={styles.searchContainer}>
                <label htmlFor="search" />
                <input
                    className={styles.searchBar}
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                />
                <div className={styles.semicircle}>
                    <input
                        type="image"
                        alt="magnifying glass"
                        src={glass}
                        className={styles.magnifier}
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.currentUser !== null
    };
};

export default connect(mapStateToProps)(Search);
