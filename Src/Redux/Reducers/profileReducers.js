import {SET_PROFILE} from '../Actions/profileAction';
const initialState = {
  data: [],
};

function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return {...state, data: action.payload};
    default:
      return state;
  }
}

export default ProfileReducer;
