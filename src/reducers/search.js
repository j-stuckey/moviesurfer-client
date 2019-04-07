import { SEARCH_REQUEST, SEARCH_SUCCESS } from '../actions/search';

const initialState = {
    searchResults: [],
    error: null,
    isFetching: false
};

const searchReducer = (state = initialState, action) => {

    switch(action.type) {
    case SEARCH_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            isFetching: false,
            searchResults: [action.data]
        };
    default:
        return state;
    }
};

export default searchReducer;