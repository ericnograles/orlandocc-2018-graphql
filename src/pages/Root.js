import React from 'react';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    justifyContent: 'center'
  },
  card: {
    minWidth: 300
  },
  cardContainer: {
    maxWidth: 420,
    marginTop: 10,
    marginRight: 10,
    animation: 'fadein 2.5s'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class Root extends React.Component {
  navigateTo = link => () => {
    const { history } = this.props;
    history.push(link);
  }
  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
        {data &&
          data.channels &&
          data.channels.map(channel => (
            <div className={classes.cardContainer}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    Channel
                  </Typography>
                  <Typography variant="headline" component="h2">
                    {channel.name}
                  </Typography>
                  <Typography component="p">{channel.purpose}</Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={this.navigateTo(`/chat/${channel.id}`)} size="small">Join</Button>
                </CardActions>
              </Card>
            </div>
          ))}
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
  }
`;

const enhance = compose(
  withRouter,
  withStyles(styles),
  graphql(query, {
    options: props => {
      const { profile } = props;
      const { access_token } = profile;
      return {
        variables: {
          access_token
        },
        skip: !profile.access_token,
        notifyOnNetworkStatusChange: true
      };
    }
  })
);

export default enhance(Root);
