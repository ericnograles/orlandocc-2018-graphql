import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  },
  textField: {
    width: '91%'
  },
  button: {
    margin: 5
  },
  chatContainer: {
    textAlign: 'left',
    marginTop: 10,
    color: '#000000',
    opacity: '87%'
  },
  chatLine: {
    animation: 'fadein 1s',
    marginTop: 5
  },
  alternateChatLine: {
    backgroundColor: 'rgb(200, 200, 200)'
  },
  chatSender: {
    fontWeight: 'bold'
  },
  chatControls: {
    animation: 'fadein 2.5s',
    flexDirection: 'column'
  }
});

class Chat extends React.Component {
  state = {
    message: '',
    sending: false,
    messages: []
  };

  channelName = 'default';

  // Unsubscribe handler from Apollo
  subscription = null;
  subscribeToMessages = props => {
    const setState = this.setState.bind(this);
    const { client, profile } = props;
    const { access_token } = profile;
    const query = gql`
      subscription channelMessage(
        $access_token: String!
        $channel_name: String!
      ) {
        channelMessageSent(
          access_token: $access_token
          channel_name: $channel_name
        ) {
          sender_email
          text
        }
      }
    `;

    const subscription = client.subscribe({
      query,
      variables: {
        access_token,
        channel_name: this.channelName
      }
    });

    // Event handler for the subscription
    this.subscription = subscription.subscribe({
      next(payload) {
        if (payload.data && !payload.errors) {
          let { channelMessageSent } = payload.data;
          // Functional state = avoids weird race conditions on multiple sub messages coming in
          setState((state, props) => {
            let messages = state.messages.slice().concat(channelMessageSent);
            return {
              messages
            };
          });
        }
      }
    });
  };

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  componentWillMount() {
    const { location } = this.props;
    this.channelName = location.pathname.replace('/chat/', '');
  }

  componentDidMount() {
    this.subscribeToMessages(this.props);
  }

  onChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  };

  sendMessage = async () => {
    const { mutate, profile } = this.props;
    const { access_token } = profile;
    const { message } = this.state;
    this.setState((state, props) => {
      return {
        sending: true
      };
    });

    let result = await mutate({
      variables: {
        access_token: access_token,
        channel_name: this.channelName,
        text: message
      }
    });

    if (!result.errors) {
      this.setState((state, props) => {
        return {
          message: '',
          sending: false
        };
      });
    }
  };

  render() {
    const { messages } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={24}
          align="center"
          className={classes.chatContainer}
        >
          {messages.map((message, index) => {
            let chatLineClasses = [classes.chatLine];
            if (index % 2 === 0) {
              chatLineClasses.push(classes.alternateChatLine);
            }
            return (
              <Grid
                item
                xs={12}
                key={`${message.sender_email}_${index}`}
                className={chatLineClasses}
              >
                <div className={classes.chat}>
                  <span className={classes.chatSender}>{`${
                    message.sender_email
                  } (${moment().format('hh:mm a')})`}</span>: {message.text}
                </div>
              </Grid>
            );
          })}
          <Grid item xs={12} className={classes.chatControls}>
            <TextField
              id="message"
              label={`Message to ${this.channelName}`}
              placeholder={`Message to ${this.channelName}`}
              className={classes.textField}
              value={this.state.message}
              onChange={this.onChange('message')}
              onKeyPress={this.onKeyPress}
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
}

const sendMessage = gql`
  mutation send(
    $access_token: String!
    $channel_name: String!
    $text: String!
  ) {
    sendChannelMessage(
      access_token: $access_token
      channel_name: $channel_name
      text: $text
    )
  }
`;

const enhance = compose(
  withStyles(styles),
  graphql(sendMessage),
  withApollo,
  withRouter
);

export default enhance(Chat);
