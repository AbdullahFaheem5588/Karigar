import {SET_PROVIDERS} from '../Actions/actions';
const initialState = {
  providersa: [],
};

function ProvidersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROVIDERS:
      return {...state, providersa: action.payload};
    default:
      return state;
  }
}

export default ProvidersReducer;
