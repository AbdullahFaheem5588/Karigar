import {SET_TOKEN} from '../Actions/tokenAction';
const initialState = {
  token: '',
};

function TokenReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload};
    default:
      return state;
  }
}

export default TokenReducer;
