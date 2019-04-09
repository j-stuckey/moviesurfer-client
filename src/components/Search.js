import React from 'react';
import { connect } from 'react-redux';
import { fetchResults } from '../actions/search';

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
    }

    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { searchTerm } = this.state;
        dispatch(fetchResults(searchTerm));
        this.setState({ touched: true });
        this.setState({ wasSearched: this.state.searchTerm });
    }

    render() {
        const [...items] = this.props.results;
		
        let searchMessage;
        if (items && this.state.touched && !this.props.isFetching) {
            searchMessage = <p>{this.props.totalResults} results found for '{this.state.wasSearched}'</p>;
        } 
        if (this.props.message) {
            searchMessage = <p>{this.props.message}</p>;
        }
		
        return (
            <div>
				
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

                {this.props.isFetching && <p>Loading...</p>}
                {searchMessage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.search.results.items,
        totalResults: state.search.results.totalResults,
        isFetching: state.search.isFetching,
        message: state.search.message
    };
};

export default connect(mapStateToProps)(Search);
