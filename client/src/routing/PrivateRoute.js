import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();
  
  };
  
  export default PrivateRoute;