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
    marginBottom: '25%',
    marginTop: '5%',
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  headerText: {
    marginRight: '25px',
    color: '#9c9c9c',
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
  createBtn: {
    marginTop: "12%",
    margin: "auto",
    padding: "15px 45px",
  },
  image: {
    height: "100vh",
  },
  topBtn: {
    width: '150px',
    lineHeight: '3em',
    boxShadow: "0 0 5px",
  },
  singnupContainer: {
    paddingLeft: "150px",
    paddingRight: "150px",
  },
});

export default function SignUpPage() {
  const { userActions, userState } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const isEmail = (email) => email.match(EMAIL_FORMAT);

  const onFormSubmit = (event) => {
    event.preventDefault();

    let errors = false;

    if (!username) {
        setUsernameError(true);
        errors = true;
    }

    if (!isEmail(email)) {
        setEmailError(true);
        errors = true;
    }

    if (!password) {
        setPasswordError(true);
        errors = true;
    }

    if (password !== confirmPassword) {
        setConfirmPasswordError(true);
        errors = true;
    }


    if(!errors) {
      userActions.handleSignup(username, email, password)
    }
  };

  useEffect(() => {
    if (username)
        setUsernameError(false);

    if (isEmail(email))
        setEmailError(false);

    if (password.length > 5)
        setPasswordError(false);

    if (password === confirmPassword)
        setConfirmPasswordError(false);

  }, [username, email, password, confirmPassword]);

  const classes = useStyles();
  return (
    <Grid container spacing={0}>
      <ImageSideBar />
      <Grid item md={7} xs={12}>
        <Container className={classes.singnupContainer}>
          <div className={classes.header}>
            <div className={classes.headerText}>Already have an account? </div>
            <Link to="/" className={classes.removeUnderLineOnLink}>
              <Button size="large" color="primary" className={classes.topBtn}>
              Login
              </Button>
            </Link>
          </div>
          <Box display="flex">
            <Typography
              variant="h4"
              fontWeight="fontWeightBold"
              className={classes.marginBottom3}
            >
              Create an account
            </Typography>
          </Box>
          <form noValidate onSubmit={onFormSubmit}>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <TextField
                autoFocus
                label="Username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                className={classes.marginBottom1}
                error={usernameError}
                helperText={usernameError && "Name required."}
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
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
                helperText={passwordError && "Password must be at least 6 characters."}
                required
              />
            </FormControl>

            <FormControl>
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={classes.marginBottom1}
                error={confirmPasswordError}
                helperText={confirmPasswordError && "Confirm password must match password."}
                required
              />
            </FormControl>

            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            //   onClick={onFormSubmit}
              className={classes.createBtn}
            >
              Create
            </Button>
          </Box>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
}
