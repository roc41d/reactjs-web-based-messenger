import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
