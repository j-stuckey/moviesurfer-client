import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import { loadAuthToken } from './local-storage';

export const store = createStore(
	combineReducers({

	}),
	applyMiddleware(thunk)
);


const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}
