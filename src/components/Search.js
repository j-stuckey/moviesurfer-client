import React from 'react';
import { connect } from 'react-redux';
// import { fetchMovies } from '../actions/movies';
// import SearchResult from './search-result';

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
            <section>
				
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search">Search</label>
                    <input
                        type="text"
                        name="search"
                        placeholder="Which TV show or movie are you searching for?"
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                </form>
                {/* {this.props.search ? (
                    <div>
                        <h1>{this.props.search[0].Title}</h1>
                    </div>
				) : null} */}
                {this.props.search ? this.props.search : null}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.currentUser !== null
    };
};

export default connect(mapStateToProps)(Search);
