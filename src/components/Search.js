import React from 'react';
import { connect } from 'react-redux';
import { fetchResults, clearSearch } from '../actions/search';
import PropTypes from 'prop-types';

import styles from './styles/Search.module.css';
import glass from '../assets/magnifying-glass.png';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            touched: false,
            wasSearched: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddFavorite = this.handleAddFavorite.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { searchTerm } = this.state;
        dispatch(fetchResults(searchTerm));
        this.setState({ touched: true });
        this.setState({ wasSearched: this.state.searchTerm });
    }
	
    handleAddFavorite(e){
        e.preventDefault();
        console.log('add favorit clicked');
    }
	
    componentWillUnmount(){
        this.props.dispatch(clearSearch());
    }
	
    render() {
        const [...items] = this.props.results;
        const { message, isFetching, totalResults, username } = this.props;
		
        // eslint-disable-next-line no-unused-vars
        let searchMessage;
        if (items && this.state.touched && !isFetching) {
            searchMessage = <p>{totalResults} results found for {this.state.wasSearched}</p>;
        }
        if (message) {
            searchMessage = <p>{this.props.message}</p>;
        }
		
        const isEnabled = this.state.searchTerm.length > 0;

        const searchResults = items.map((result, index)=> {
            
            return (
                <div key={index}>
                    <div key={index}>
                        <p>{result.Title} ({result.Year})</p>
                        <img src={result.Poster} alt="media poster"/>
                    </div>
                    <button onClick={this.handleAddFavorite}>Add</button>
                </div>
                
            );
        });
		
        return (
            <div>
                <p>Welcome {this.props.username}!</p>
                <form className={styles.searchContainer} onSubmit={this.handleSubmit}>
                    <label htmlFor="search" />
                    <input
                        className={styles.searchBar}
                        type="text"
                        name="searchTerm"
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
                            disabled={!isEnabled}
                        />
                    </div>
                </form>

                {isFetching && <p>Loading...</p>}
                {searchMessage}

                {searchResults.length > 0 && <ul className={styles.ul}>{searchResults}</ul>}
            </div>
            
        );
    }
}

Search.propTypes = {
    username: PropTypes.string.isRequired,
    message: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    totalResults: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser.username,
        results: state.search.results.items,
        totalResults: state.search.results.totalResults,
        isFetching: state.search.isFetching,
        message: state.search.message
    };
};

export default connect(mapStateToProps)(Search);
