import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import { reducer as formReducer } from 'redux-form';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import { loadAuthToken } from './local-storage';
import searchReducer from './reducers/search';

const appReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    search: searchReducer,
});

export const RESET_STATE = 'RESET_STATE';
export const resetState = () => ({
    type: RESET_STATE,
});

const rootReducer = (state, action) => {
    if (action.type === RESET_STATE) {
        state = undefined;
    }
    return appReducer(state, action);
};

export const store = createStore(rootReducer, applyMiddleware(thunk));

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}
