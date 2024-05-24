import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers';

export const Store = createStore(rootReducer, applyMiddleware(thunk));
