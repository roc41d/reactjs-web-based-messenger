import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import MessagerPage from "./pages/Messager";
import { UserProviderContext } from "./contexts/userProviderContext";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProviderContext>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/messager" component={MessagerPage} />
          </Switch>
        </UserProviderContext>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
