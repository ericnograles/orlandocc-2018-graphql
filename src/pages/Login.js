import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import connectOnly from '../redux/connectors/connectOnly';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  form: {
    flexGrow: 1
  },
  textField: {
    maxWidth: 600
  },
  button: {
    margin: 10
  }
});

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loggingIn: false,
    error: null
  };

  onChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  login = async () => {
    try {
      this.setState({loggingIn: true});
      const { mutate, profileActions, push } = this.props;
      const { email, password } = this.state;
      let result = await mutate({
        variables: {
          user: {
            email,
            password
          }
        }
      });

      if (result.data.login) {
        this.setState({loggingIn: false});
        profileActions.setProfile(result.data.login);
        push('/chat/general');
      } else {
        throw new Error(`Invalid login`);
      }
    } catch(error) {
      this.setState({error});
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} align="center">
          <form className={classes.form} noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.onChange('email')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                id="password"
                label="Password"
                placeholder="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.onChange('password')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
                disabled={this.state.loggingIn}
                onClick={this.login}
              >
                {this.state.loggingIn ? 'Logging In...' : 'Login'}
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
    );
  }
};

const login = gql`
mutation login($user: LoginUser) {
  login(user: $user) {
    first_name
    last_name
    email
    access_token
    expires_in
    refresh_token
  }
}`

const enhance = compose(
  connectOnly, 
  withStyles(styles),
  graphql(login)
);

export default enhance(Login);
