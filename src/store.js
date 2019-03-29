import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import { reducer as formReducer } from 'redux-form';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import { loadAuthToken } from './local-storage';

export const store = createStore(
    combineReducers({
        auth: authReducer,
        form: formReducer
    }),
    applyMiddleware(thunk)
);


const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}
