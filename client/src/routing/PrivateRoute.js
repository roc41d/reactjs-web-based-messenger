import { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/userProviderContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userState } = useContext(UserContext);
    const location = useLocation();

    return (
      <Route {...rest}>
        {userState.user ?
          <Component />
        :
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        }
      </Route>
    );
  
  };
  
  export default PrivateRoute;