import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  Container,
} from "@material-ui/core";
import ToastAlert from "../components/ToastAlert";
import ImageSideBar from "../components/ImageSideBar";
import { UserContext } from "../contexts/userProviderContext";
import {
  EMAIL_FORMAT
} from "../utils/contanst"

const useStyles = makeStyles({
  removeUnderLineOnLink: {
    textDecoration: "none",
  },
  header: {
    marginBottom: "25%",
    marginTop: "5%",
    display: "inline-flex",
    alignItems: "baseline",
  },
  headerText: {
    marginRight: "25px",
    color: "#9c9c9c",
  },
  marginBottom3: {
    marginBottom: "3%",
  },
  marginBottom1: {
    marginBottom: "4%",
  },
  createAccountBtn: {
    marginLeft: "15%",
    outline: "none",
  },
  loginBtn: {
    marginTop: "12%",
    margin: "auto",
    padding: "15px 45px",
  },
  image: {
    height: "100vh",
  },
  topBtn: {
    width: "180px",
    lineHeight: "3em",
    boxShadow: "0 0 5px",
  },
  loginContainer: {
    paddingLeft: "150px",
    paddingRight: "150px",
  },
});
export default function LoginPage() {
  const { userActions, userState } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const isEmail = (email) => email.match(EMAIL_FORMAT);

  const onFormSubmit = (event) => {
    event.preventDefault();

    let errors = [];

    if (!isEmail(email)) {
      setEmailError(true);
      errors.push(true);
    }

    if (!password || (password && password.length < 6)) {
      setPasswordError(true);
      errors.push(true);
    }

    if (errors.length === 0) {
      userActions.handleLogin(email, password)
    }
  };

  useEffect(() => {
    if (isEmail(email)) 
      setEmailError(false);

    if (password.length > 5)
      setPasswordError(false);
  }, [email, password]);

  const classes = useStyles();
  return (
    <Grid container spacing={0}>
      <ImageSideBar />
      <Grid item md={7} xs={12}>
        <Container className={classes.loginContainer}>
          <div className={classes.header}>
            <div className={classes.headerText}>Don't have an account? </div>
            <Link to="/signup" className={classes.removeUnderLineOnLink}>
              <Button size="large" color="primary" className={classes.topBtn}>
                Create account
              </Button>
            </Link>
          </div>
          <Box display="flex">
            <Typography
              variant="h4"
              fontWeight="fontWeightBold"
              className={classes.marginBottom3}
            >
              Welcome back!
            </Typography>
          </Box>
          <form noValidate onSubmit={onFormSubmit}>
            <Box display="flex" flexDirection="column">
              <FormControl>
                <TextField
                  autoFocus
                  label="Email"
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  className={classes.marginBottom1}
                  error={emailError}
                  helperText={emailError && "Invalid email."}
                  required
                />
              </FormControl>

              <FormControl>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={classes.marginBottom1}
                  error={passwordError}
                  helperText={
                    passwordError && "Password must be at least 6 characters."
                  }
                  required
                />
              </FormControl>

              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                className={classes.loginBtn}
              >
                Login
              </Button>
            </Box>
          </form>
        </Container>
      </Grid>
      <ToastAlert trigger={userState.errorMsg} />
    </Grid>
  );
}
