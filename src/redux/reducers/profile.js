import { PROFILE } from '../actions/profile.types';

export const PROFILE_STATUS = {
  ANONYMOUS: 'ANONYMOUS',
  AUTHENTICATED: 'AUTHENTICATED',
  LOGGED_OUT: 'LOGGED_OUT'
};

const initialState = {
  status: PROFILE_STATUS.ANONYMOUS
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE.SET_PROFILE:
    case PROFILE.RETRIEVE_PROFILE_WITH_TOKEN:
      return retrieveProfileWithToken(state, action);
    case PROFILE.LOGOUT:
      return Object.assign({}, state, {status: PROFILE_STATUS.LOGGED_OUT});
    default:
      return state;
  }
};

function retrieveProfileWithToken(state, action) {
  return Object.assign({}, state, {
    status: PROFILE_STATUS.AUTHENTICATED,
    ...action.profile
  });
}
