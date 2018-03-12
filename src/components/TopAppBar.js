import React from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import connectOnly from '../redux/connectors/connectOnly';
import { PROFILE_STATUS } from '../redux/reducers/profile';
import { Link } from 'react-router-dom';

const styles = {
  root: {},
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class TopAppBar extends React.Component {
  logout = () => {
    const { profileActions } = this.props;
    profileActions.logout();
  };

  render() {
    const { classes, profile } = this.props;

    return (
      profile.status === PROFILE_STATUS.AUTHENTICATED &&
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: '#ffffff' }}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="home"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Orlando Code Camp 2018 GraphQL
          </Typography>
          <Button color="inherit" onClick={this.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const enhance = compose(connectOnly, withStyles(styles));

export default enhance(TopAppBar);
