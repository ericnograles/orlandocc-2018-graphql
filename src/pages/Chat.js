import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import connectAsAuthenticated from '../redux/connectors/connectAsAuthenticated';
import { PROFILE_STATUS } from '../redux/reducers/profile';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    maxWidth: 600
  },
  button: {
    margin: 10
  }
});

class Chat extends React.Component {
  state = {
    message: '',
    sending: false,
    messages: []
  };

  subscribeToMessages = (props) => {
    const setState = this.setState.bind(this);
    const { client, profile } = props;
    const { access_token } = profile;
    const query = gql`
    subscription channelMessage($access_token: String!, $channel_name: String!) {
      channelMessageSent(access_token: $access_token, channel_name: $channel_name) {
        sender_email
        text
      }
    }`;

    const subscription = client.subscribe({
      query,
      variables: {
        access_token,
        channel_name: 'test-channel'
      }
    });

    // Append message
    subscription.subscribe({
      next(payload) {
        if (payload.data && !payload.errors) {
          let { channelMessageSent } = payload.data;
          setState((state, props) => {
            let messages = state.messages
              .slice()
              .concat(channelMessageSent);
            return {
              messages
            }
          });
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = this.props;
    if (profile.status !== PROFILE_STATUS.AUTHENTICATED && nextProps.profile.status === PROFILE_STATUS.AUTHENTICATED) {
      this.subscribeToMessages(nextProps);
    }
  }

  componentDidMount() {
    const { profile } = this.props;
    if (profile.status === PROFILE_STATUS.AUTHENTICATED) {
      this.subscribeToMessages(this.props);
    }
  }

  onChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  sendMessage = async () => {
    const { mutate, profile } = this.props;
    const { access_token } = profile;
    const { message } = this.state;
    this.setState((state, props) => {
      return {
        sending: true
      }
    });

    let result = await mutate({
      variables: {
        access_token: access_token,
        channel_name: 'test-channel',
        text: message
      }
    });

    if (!result.errors) {
      this.setState((state, props) => {
        return {
          message: '',
          sending: false
        }
      });
    }
  }

  render() {
    const { messages } = this.state;
    const { classes } = this.props;
    let channel_name = 'test';
    return (
      <div className={classes.root}>
        <Grid container spacing={24} align="center">
          {messages.map(message => 
            <Grid item xs={12}>
              {`${message.sender_email} (${new Date()}): ${message.text}`}
            </Grid>
          )}
          <Grid item xs={12}>
              <TextField
                fullWidth
                id="message"
                label={`Message to send to ${channel_name}`}
                placeholder={`Message to send to ${channel_name}`}
                className={classes.textField}
                value={this.state.message}
                onChange={this.onChange('message')}
                margin="normal"
              />
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
                disabled={this.state.sending}
                onClick={this.sendMessage}
              >
                {this.state.sending ? 'Sending...' : 'Send'}
              </Button>
            </Grid>
            
        </Grid>
      </div>
    );
  }
};

const sendMessage = gql`
mutation send($access_token: String!, $channel_name: String!, $text: String!) {
  sendChannelMessage(
    access_token: $access_token
    channel_name: $channel_name
    text: $text
  )
}
`;

const enhance = compose(
  connectAsAuthenticated, 
  withStyles(styles),
  graphql(sendMessage),
  withApollo
);

export default enhance(Chat);
