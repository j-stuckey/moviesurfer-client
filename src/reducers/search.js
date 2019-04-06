import { SEARCH_REQUEST } from '../actions/search';

const initialState = {
    error: null,
    loading: false
};

const searchReducer = (state = initialState, action) => {
    if (action.type === SEARCH_REQUEST) {
        return {
            ...state,
            loading: true
        };
    }
    return state;
};

export default searchReducer;