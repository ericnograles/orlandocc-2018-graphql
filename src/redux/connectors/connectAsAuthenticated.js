import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { LOCAL_STORAGE, PROFILE_STATUS } from '../../constants';
import * as ProfileActionCreators from '../actions/profile.creators';

export default function connectWithReduxAndRouter(WrappedComponent) {
  class ConnectedComponent extends React.Component {
    componentDidMount() {
      const { profileActions, push } = this.props;
      if (!localStorage[LOCAL_STORAGE.TOKEN]) {
        push('/');
      }
      if (localStorage[LOCAL_STORAGE.TOKEN]) {
        let auth = JSON.parse(localStorage[LOCAL_STORAGE.TOKEN]);
        profileActions.retrieveProfileFromToken(auth.access_token);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { push } = this.props;
      if (nextProps.profile.status !== PROFILE_STATUS.AUTHENTICATED) {
        push('/login');
      }
    }

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
