import { PROFILE } from './profile.types';
import { LOCAL_STORAGE } from '../../constants';
import gql from 'graphql-tag';

const currentUserQuery = gql`
query profile($accessToken: String!) {
  current_user(access_token: $accessToken) {
    first_name
    last_name
    access_token
    refresh_token
    expires_in
  }
}
`;

export function setProfile(profile) {
  localStorage.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(profile));
  return {
    type: PROFILE.SET_PROFILE,
    profile
  }
}

export function retrieveProfileFromToken(accessToken, client) {
  return async (dispatch, store) => {
    let results = await client.query({
      query: currentUserQuery,
      variables: {
        accessToken
      }
    });

    let { current_user } = results.data;
    if (current_user) {
      localStorage.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(current_user));
      dispatch({
        type: PROFILE.RETRIEVE_PROFILE_WITH_TOKEN,
        profile: current_user
      });
    } else {
      dispatch({
        type: PROFILE.LOGOUT
      });
    }
  };
}

export function logout() {
  localStorage.removeItem(LOCAL_STORAGE.TOKEN);
  return {
    type: PROFILE.LOGOUT
  };
}
