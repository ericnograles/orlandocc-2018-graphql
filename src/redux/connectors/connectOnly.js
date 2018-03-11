import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as ProfileActionCreators from '../actions/profile.creators';

export default function connectWithRedux(WrappedComponent) {
  class ConnectedComponent extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    let { profile, routing } = state;
    return {
      profile,
      routing
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      push: bindActionCreators(push, dispatch),
      profileActions: bindActionCreators(ProfileActionCreators, dispatch)
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
}
