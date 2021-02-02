// import React, { createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UserProvider = (props) => {
  let history = useHistory();

  async function handleLogin(email, password) {
  
    history.push("/messager");
  }

  async function handleSignup(username, email, password, confirmPassword) {
    history.push("/messager");
  }
};

export { UserProvider };
