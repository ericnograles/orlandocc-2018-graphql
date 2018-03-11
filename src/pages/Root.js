import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    flexGrow: 1,
  }
};

class Root extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      </div>
    );
  }
}

export default withStyles(styles)(Root);
