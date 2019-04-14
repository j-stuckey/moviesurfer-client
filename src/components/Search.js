import React from 'react';
import { connect } from 'react-redux';
import { fetchResults, clearSearch } from '../actions/search';
import PropTypes from 'prop-types';

import styles from './styles/Search.module.css';
import glass from '../assets/magnifying-glass.png';

import PulseLoader from 'react-spinners/PulseLoader';

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            touched: false,
            wasSearched: '',
            currentPage: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddFavorite = this.handleAddFavorite.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ currentPage: 1 });
        const { dispatch } = this.props;
        const { searchTerm } = this.state;
        dispatch(fetchResults(searchTerm));
        this.setState({ touched: true });
        this.setState({ wasSearched: this.state.searchTerm });
    }
	
    handleAddFavorite(e){
        e.preventDefault();
        console.log('add favorite clicked');
    }
	
    componentWillUnmount(){
        this.props.dispatch(clearSearch());
    }

    async goToNextPage(event){
        const { dispatch } = this.props;		
        await this.setState({ currentPage: this.state.currentPage + 1 });
        dispatch(fetchResults(this.state.searchTerm, this.state.currentPage));
    }
	
    async goToPrevPage(event){
        const { dispatch } = this.props;
        await this.setState({ currentPage: this.state.currentPage - 1 });
        dispatch(fetchResults(this.state.searchTerm, this.state.currentPage));		
    }
	
    render() {
        const items = this.props.results.items;
        const { message, isFetching, totalResults, username, results, pageCount} = this.props;
		
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

                <PulseLoader
                    sizeUnit={'px'}
                    size={20}
                    color={'#51b9f5'}
                    loading={isFetching}
                />
                {searchMessage}

                {(totalResults > 10 && this.props.pageCount > 1 && this.state.currentPage > 1) && <button onClick={this.goToPrevPage}>Prev page</button>}
                {(totalResults > 10 && this.state.currentPage < this.props.pageCount)  && <button onClick={this.goToNextPage}>Next page</button>}
                {items.length > 0 && <p>Page {this.state.currentPage} of {pageCount}</p>}

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
        results: state.search.results,
        pageCount: state.search.results.pageCount,
        totalResults: state.search.results.totalResults,
        isFetching: state.search.isFetching,
        message: state.search.message,
        currentPage: state.search.currentPage
    };
};

export default connect(mapStateToProps)(Search);
