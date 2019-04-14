import { API_BASE_URL } from '../config';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequest = () => ({
    type: SEARCH_REQUEST
});

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const searchSuccess = response => ({
    type: SEARCH_SUCCESS,
    response
});

export const SEARCH_ERROR = 'SEARCH_ERROR';
export const searchError = err => ({
    type: SEARCH_ERROR,
    err
});

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = () => ({
    type: CLEAR_SEARCH
});

export const fetchResults = (searchTerm, pageNumber = 1) => (dispatch, getState) => {
    dispatch(searchRequest(searchTerm));
    return fetch(`${API_BASE_URL}/search?searchTerm=${searchTerm}&pageNumber=${pageNumber}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            dispatch(searchSuccess(res));
        })
        .catch(err => {
            dispatch(searchError(err));
        });
};
