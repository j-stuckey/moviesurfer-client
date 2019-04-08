import { SEARCH_REQUEST, SEARCH_SUCCESS } from '../actions/search';

const initialState = {
    results: {},
    error: null,
    isFetching: false
};

const results = (action) => {
    return {
        items: [...action.response.searchResults],
        totalResults: action.response.totalResults
    };
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
    case SEARCH_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            isFetching: false,
            results: results(action)
        };
    default:
        return state;
    }
};

export default searchReducer;
