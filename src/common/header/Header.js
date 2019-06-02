import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    margin: 10,
    width: 32,
    height: 32
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: 4,
    backgroundColor: '#c0c0c0',
    '&:hover': {
      backgroundColor: '#c0c0c0',
    },
    marginLeft: 0,
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));


function Header(props) {
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}> 
            <Link href='/profile/' className={classes.link}>
                Profile
            </Link>
        </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href='/' className={classes.link}>
            Logout
        </Link>
      </MenuItem>
    </Menu>
  );
  
  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose(menu) {
    setAnchorEl(null);       
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:'#263238'}}>
        <Toolbar variant="dense">          
          <Typography className={classes.title} variant="h6" noWrap>
            Image Viewer
          </Typography>
          {props.showSearch === "true" ?
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              inputComponent = "input"
              id = "search"
              name = "search"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>   
          : ""}
          {props.showProfile === "true" ?
          <IconButton
              edge="end"
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
                <Avatar alt="Remy Sharp" src="https://scontent.cdninstagram.com/vp/a00d1efa0c39e2e35c26134689f21261/5D8A162A/t51.2885-19/s150x150/60113385_2304743493132057_1881074158138294272_n.jpg?_nc_ht=scontent.cdninstagram.com" className={classes.avatar} />    
            </IconButton> 
            : "" }
        </Toolbar>
      </AppBar>
      {renderMenu}
      
    </div>
  );
}

export default Header;
