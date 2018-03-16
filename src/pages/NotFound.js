import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  }
});

const NotFound = (props) => (
  <div className={props.classes.root}>
    <img src="assets/images/404.gif" alt="wut"/>
    <Link to="/">Home</Link>
  </div>
);

export default withStyles(styles)(NotFound);
