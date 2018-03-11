import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import connectOnly from '../redux/connectors/connectOnly';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  form: {
    flexGrow: 1
  },
  textField: {
    maxWidth: 600
  },
});

class Login extends React.Component {
  state = {
    email: null,
    password: null
  };

  onChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container spacing={24} align="center">
        <form className={classes.form} noValidate autoComplete="off">
        
        <Grid item xs={12}>
          <TextField fullWidth
            id="email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.onChange('email')}
            margin="normal"
          />
          </Grid>
          <Grid item xs={12}>
          <TextField fullWidth
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
          </form>
          </Grid>
      </div>
    );
  }
}

const enhance = compose(
  connectOnly,
  withStyles(styles)
);

export default enhance(Login);
