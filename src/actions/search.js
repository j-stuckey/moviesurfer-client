export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequest = () => ({
    type: SEARCH_REQUEST
});

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const searchSuccess = (results) => ({
    type: SEARCH_SUCCESS,
    results
}); 

export const fetchResults = (searchTerm) => (dispatch) => {
    dispatch(searchRequest(searchTerm));
	
    console.log(getState().search);
	
    // just a test to see if redux state changes
    dispatch(searchSuccess({ testData: [] }));
    console.log(getState().search);
};