import { SEARCH_REQUEST, SEARCH_SUCCESS } from '../actions/search';

const initialState = {
    error: null,
    isFetching: false
};

const searchReducer = (state = initialState, action) => {
    // if (action.type === SEARCH_REQUEST) {
    //     return {
    //         ...state,
    //         loading: true
    //     };
    // }
    // return state;
    switch(action.type) {
    case SEARCH_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            isFetching: false
        };
    default:
        return state;
    }
};

export default searchReducer;