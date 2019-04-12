import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CLEAR_SEARCH
} from '../actions/search';

const initialState = {
    results: {
        items: [],
        totalResults: 0,
        pages: 1
    },
    currentPage: 1,
    message: '',
    error: null,
    isFetching: false
};

const results = (action) => {
    return {
        items: [...action.response.searchResults],
        totalResults: Number(action.response.totalResults),
        pages: Math.ceil(action.response.totalResults / 10)
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
            message: action.response.message,
            results: results(action)
        };
    case SEARCH_ERROR:
        return {
            ...state,
            error: action.err
        };
    case CLEAR_SEARCH:
        return initialState;
    default:
        return state;
    }
};

export default searchReducer;
