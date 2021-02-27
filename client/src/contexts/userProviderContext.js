import React, { createContext, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userReducer } from "../reducers/userReducer";
import axios from "axios";

import {
  UPDATE_USER,
  USER_ERROR,
  CLEAR_ERRORS
} from "../reducers/userReducer";
import {
  LOGIN_URI,
  SIGNUP_URI,
  USER_DETAILS_URI
} from "../utils/contanst"

const UserContext = createContext();

const initialState = {
  user: { name: '' },
};

const UserProviderContext = (props) => {
  const history = useHistory();
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const actions = {
    handleSignup: async (username, email, password) => {
        try {
          const res = await axios.post(SIGNUP_URI, {
            username,
            email,
            password,
          });
          const data = res.data;
          dispatch({ type: UPDATE_USER, payload: data });
          history.push('/messenger');
        } catch (err) {
          let errorMsg;
          if(err.message.includes('400'))
            errorMsg = 'Invalid credentials';

          if(err.message.includes('500'))
            errorMsg = 'Server error.';

          dispatch({
            type: USER_ERROR,
            payload: errorMsg
          });
        }
    },

      handleLogin: async (email, password) => {
        try {
          const res = await axios.post(LOGIN_URI, { email, password });
          const data = res.data;
          if (res && (res.status === 200 || res.status === 201)) {
            history.push('/messenger');
          }
  
          dispatch({ type: UPDATE_USER, payload: data });
          return res;
        } catch (err) {
          let errorMsg;
          if (err.message.includes('400'))
            errorMsg = 'Invalid credentials';

          if (err.message.includes('404'))
            errorMsg = 'User not found';
            
          if (err.message.includes('500'))
            errorMsg = 'Server error';

          dispatch({
            type: USER_ERROR,
            payload: errorMsg,
          });

        }
      },

      getCurrenthUser: async () => {
        try {
          const res = await axios.get(USER_DETAILS_URI);
  
          if (res.status === 200) {
            const data = await res.data;
  
            dispatch({ type: UPDATE_USER, payload: data });
            history.push('/messenger');
          } else {
            history.push('/');
          }
        } catch (err) {
          history.push('/');
        }
      },

      clearErrors: () => {
        dispatch({ type: CLEAR_ERRORS });
      },
  };

  useEffect(() => {

    /**
    * everytime is the APP loads, 
    * get current user profile if user has an active seerion or redirect to login
    */
    actions.getCurrenthUser();
  }, []);

  useEffect(() => {
    let timer;
    if (userState.errorMsg) {
      timer = setTimeout(() => {
        actions.clearErrors();
      }, 3000);
    }
    return () => clearTimeout(timer);
  });

  return (
    <UserContext.Provider
      value={{
        userState,
        userActions: actions,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProviderContext, UserContext };
