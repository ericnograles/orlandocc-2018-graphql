import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import connectOnly from '../redux/connectors/connectOnly';

const styles = {
  root: {
    flexGrow: 1,
  }
};

class Login extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        TODO: Login
      </div>
    );
  }
}

const enhance = compose(
  connectOnly,
  withStyles(styles)
);

export default enhance(Login);
