import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProfileActionCreators from '../actions/profile';

export default function connectAsAnonymous(WrappedComponent) {
  class ConnectedComponent extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    let { profile } = state;
    return {
      profile
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      profileActions: bindActionCreators(ProfileActionCreators, dispatch)
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
}
