import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  }
};

class Root extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
        <ul>
        {data && data.channels && data.channels.map(channel => 
        <li key={channel.id}>
          <Link to={`/chat/${channel.id}`}>{channel.name}</Link>
        </li>
        )}
        </ul>
      </div>
    );
  }
}

const query = gql`
query getChannels($access_token: String!) {
  channels(access_token: $access_token) {
    id
    name
    purpose
  }
}`;

const enhance = compose(
  withStyles(styles),
  graphql(query, {
    options: props => {
      const { profile } = props;
      const { access_token } = profile;
      return {
        variables: {
          access_token
        },
        skip: !profile.access_token, // TODO: get rid of this, was a Redux accomodation?
        notifyOnNetworkStatusChange: true
      } 
    }
  })
);

export default enhance(Root);
