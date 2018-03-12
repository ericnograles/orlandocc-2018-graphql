import React from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { LOCAL_STORAGE } from '../../constants';
import { PROFILE_STATUS } from '../reducers/profile';
import * as ProfileActionCreators from '../actions/profile.creators';

export default function connectAsAuthenticated(WrappedComponent) {
  class ConnectedComponent extends React.Component {
    componentDidMount() {
      const { profileActions, push, client } = this.props;
      if (!localStorage[LOCAL_STORAGE.TOKEN]) {
        push('/login');
      }
      if (localStorage[LOCAL_STORAGE.TOKEN]) {
        let auth = JSON.parse(localStorage[LOCAL_STORAGE.TOKEN]);
        profileActions.retrieveProfileFromToken(auth.access_token, client);
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

  const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withApollo
  )

  return enhance(ConnectedComponent);
}
