import { PROFILE } from '../actionTypes';

const initialState = {};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE.RETRIEVE_PROFILE_FROM_TOKEN:
      return retrieveProfileFromToken(state, action);
    default:
      return state;
  }
};

function retrieveProfileFromToken(state, action) {
  return Object.assign({}, state, action.profile);
}
