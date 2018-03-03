import { PROFILE } from '../actionTypes';

export function retrieveProfileFromToken(accessToken) {
  return async (dispatch, store) => {
    dispatch({
      type: PROFILE.RETRIEVE_PROFILE_FROM_TOKENs,
      profile: {
        firstName: 'TODO: firstName',
        lastName: 'TODO: lastName',
        email: 'TODO: email'
      }
    });
  };
}
