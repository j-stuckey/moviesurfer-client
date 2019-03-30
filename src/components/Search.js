import React from 'react';
import { connect } from 'react-redux';
import styles from './styles/Search.module.css';

// import { fetchMovies } from '../actions/movies';
// import SearchResult from './search-result';

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
        // this.props.dispatch(fetchMovies(this.state.searchTerm));
        this.setState({ searchTerm: '' });
    }

    render() {
        return (
            <React.Fragment>
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
                        <input type="image" src={glass} className={styles.magnifier}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.currentUser !== null
    };
};

export default connect(mapStateToProps)(Search);
