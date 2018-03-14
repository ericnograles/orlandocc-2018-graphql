import React from 'react';

/**
 * 
 * @param {Component} WrappedComponent - A component in which to pass the top level's App state to via props
 * @param {Object} state - The state to connect to 
 */
export default function connectToApp(WrappedComponent, state, props) {
  class ConnectedComponent extends React.Component {
    render() {
      return <WrappedComponent {...state} {...props} />;
    }
  }

  return ConnectedComponent;
}
