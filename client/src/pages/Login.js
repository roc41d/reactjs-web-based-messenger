import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Hidden,
  FormControl,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles({
  removeUnderLineOnLink: {
    textDecoration: "none",
  },
  marginBottom40: {
    marginBottom: '40%',
  },
  grayText: {
    color: '#9c9c9c',
  },
  marginBottom3: {
    marginBottom: '3%',
  },
  marginBottom1: {
    marginBottom: '1%',
  },
  createAccountBtn: {
    marginLeft: '15%',
    outline: 'none',
  },
  loginBtn: {
    marginTop: '5%',
  },
});
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  return (
    <Grid container spacing={0}>
      <Hidden smDown>
        <Grid item xs={5}>
          <h1>Side bar</h1>
        </Grid>
      </Hidden>
      <Grid item md={7} xs={12}>
        <Container>
          <Box display="flex" className={classes.marginBottom40}>
            <Typography variant="subtitle1">Don't have an account? </Typography>
            <Link to="/signup" className={classes.removeUnderLineOnLink}>
              <Button size="large" variant="outlined" color="primary">
                Create account
              </Button>
            </Link>
          </Box>
          <Box display="flex">
            <Typography variant="h4" fontWeight="fontWeightBold" className={classes.marginBottom3}>
              Welcome back!
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <TextField
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                className={classes.marginBottom1}
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
                required
              />
            </FormControl>

            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={classes.loginBtn}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
