import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Home from '../../home/Home'; 
import './Header.css';
const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};



class Header extends Component {
    render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
              <Home>
              <Button variant="contained" className="primary"/>
                </Home>
            </IconButton>
            <Typography variant="h6" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);