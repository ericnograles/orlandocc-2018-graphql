import React from 'react';
import TopAppBar from './components/TopAppBar';
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
        <TopAppBar {...this.props} />
      </div>
    );
  }
}

export default withStyles(styles)(Root);
