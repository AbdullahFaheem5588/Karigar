import {combineReducers} from 'redux';
import TokenReducer from './tokenreducer';
import ProvidersReducer from './reducers';
import ProfileReducer from './profileReducers';
const rootReducer = combineReducers({
  ProvidersReducer,
  TokenReducer,
  ProfileReducer,
});

export default rootReducer;
