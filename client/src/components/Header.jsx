import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: "inherit",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={classes.root}>
      <AppBar postion='static' color='primary'>
        <Toolbar>
          <Link to='/' className={classes.logo}>
            <StorefrontIcon style={{ fontSize: 40 }} />
          </Link>
          <Link to='/' className={classes.link}>
            <Typography variant='h6'>My Shop</Typography>
          </Link>
          <Link to='/cart' className={classes.linkBtn}>
            <Button color='inherit'>Cart</Button>
          </Link>
          {userInfo ? (
            <>
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <Link to='/login' className={classes.linkBtn}>
              <Button color='inherit'>Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
