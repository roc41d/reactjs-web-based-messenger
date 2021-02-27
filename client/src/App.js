import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import MessengerPage from "./pages/Messenger";
import { UserProviderContext } from "./contexts/userProviderContext";
import PrivateRoute from "./routing/PrivateRoute";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProviderContext>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <PrivateRoute path="/messenger" component={MessengerPage} />
          </Switch>
        </UserProviderContext>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
