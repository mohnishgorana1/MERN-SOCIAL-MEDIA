import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined.js";
import useStyles from "./styles.js";
import Input from "./Input.jsx";
import { useState } from "react";
function Auth() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);

  const switchMode = () => {
    setisSignUp(!isSignUp);
  };
  const handleSubmit = () => {};
  const handleChange = () => {};
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
