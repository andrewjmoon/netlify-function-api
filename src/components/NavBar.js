import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import { useAuth0 } from './react-auth0-spa';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #lightred 30%, #FF8E53 90%)',
    borderRadius: 8,
    border: 0,
    color: 'white',
    height: 60,
    width: 2000,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 0.25,
    color: 'black'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: 'black'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'aquamarine',
    color: 'black'
  },
  drawerHeader: {
    display: 'flex',

    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}));

function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  function toggleDrawer(booleanValue) {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect({})}>Log in</Button>
          )}

          {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
          <Typography variant="h6" className={classes.title}>
            <Link className="Link" to="/">
              <p>Home</p>
            </Link>
          </Typography>
          <Typography
            variant="h4"
            colorInherit="inherit"
            className={classes.title}
          >
            <Link className="Link" to="/">
              <p>Searching for the Local Food Places</p>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{ color: `black` }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <List>
          <ListItem>
            <Link className="Link" to="/">
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link className="Link" to="/about">
              About
            </Link>
          </ListItem>
          <ListItem>
            <Link className="Link" to="/searchablemap">
              Search Map
            </Link>
          </ListItem>
          <ListItem>
            <Link className="Link" to="/restaurants">
              Restaurant List
            </Link>
          </ListItem>
          <ListItem>
            <Link className="Link" to="/localfoodplaces">
              Local Food Business List
            </Link>
          </ListItem>
          <ListItem>
            <Link className="Link" to="/map">
              Restaurant Map
            </Link>
          </ListItem>
          <ListItem>
            <Link className="Link" to="/map2">
              Food Business Map
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default ButtonAppBar;
