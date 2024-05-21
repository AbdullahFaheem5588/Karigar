export const SET_PROVIDERS = 'SET_PROVIDERS';

export const setProviders = providers => dispatch => {
  dispatch({
    type: SET_PROVIDERS,
    payload: providers,
  });
};
