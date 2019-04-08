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

export const fetchResults = searchTerm => (dispatch, getState) => {
    dispatch(searchRequest(searchTerm));
    return fetch(`${API_BASE_URL}/search?title=${searchTerm}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            dispatch(searchSuccess(res));
        })
        .catch(err => console.log(err));
};
