import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import StorefrontIcon from '@material-ui/icons/Storefront';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
    textDecoration: 'none', 
    color: 'inherit'
  },
  title: {
    flexGrow: 1,
  },
   link: {
    flexGrow: 1,
    textDecoration: 'none', 
    color: 'inherit'
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar postion="static" color="primary">
        <Toolbar>
          <Link to='/' className={classes.logo}>
            <StorefrontIcon style={{ fontSize: 40 }} />
            </Link>
          <Link to='/' className={classes.link} >
            <Typography variant="h6">
              My Shop
            </Typography>
</Link>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Cart</Button>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
