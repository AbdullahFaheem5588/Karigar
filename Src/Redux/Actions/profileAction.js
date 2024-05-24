export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = profile => dispatch => {
  dispatch({
    type: SET_PROFILE,
    payload: profile,
  });
};
