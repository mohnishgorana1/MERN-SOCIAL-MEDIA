import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined.js";
// import { GoogleLogin } from "react-google-login";
import useStyles from "./styles.js";
import Input from "./Input.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Icon from "./icon.jsx";
import { registerAsync, loginAsync } from "../../Redux/authSlice.js";
function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignup] = useState(false);

  /**
 // const googleSuccess = async () => {
  //   console.log("Google Sign in was successful");
  // };
  // const googleFailure = async () => {
  //   console.log("Google Sign in was unsuccessful");
  // };
 */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const switchMode = () => {
    setIsSignup(!isSignUp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData: ", formData);
    if (isSignUp) {
      dispatch(registerAsync(formData));
      navigate("/");
      return;
    } else {
      dispatch(loginAsync(formData));
      navigate("/");
      return;
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  type="text"
                  half
                  autoFocus
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  type="text"
                  half
                  autoFocus
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={!showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          {/* <GoogleLogin
            clientId="GOOGLE ID"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an Account ? Sign In"
                  : "Don't have an Account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
