export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequest = () => ({
    type: SEARCH_REQUEST
});

export const fetchResults = (searchTerm) => dispatch => {
    dispatch(searchRequest(searchTerm));
};