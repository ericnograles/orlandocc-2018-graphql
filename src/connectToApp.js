import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 *
 * @param {Component} WrappedComponent - A component in which to pass the top level's App state to via props
 * @param {Object} state - The state to connect to
 */
export default function connectToApp(WrappedComponent, state, props, redirectToLogin = true) {
  class ConnectedComponent extends React.Component {
    render() {
      const { profile, error } = state;
      return !error && (profile.access_token || !redirectToLogin) ? (
        <WrappedComponent {...state} {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }
  }

  return ConnectedComponent;
}
