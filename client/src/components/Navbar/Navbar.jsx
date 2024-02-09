import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles.js";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../Redux/authSlice.js";

function Navbar() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user) || null;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   if (token) {
  //     console.log(token);
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date.getTime()) {
  //       dispatch(logout());
  //     }
  //   }
  // }, [dispatch]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to={"/"}
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            {/* <Avatar className={classes.purple} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar> */}
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to={"/auth"}
            variant="contained"
            className={classes.logout}
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
