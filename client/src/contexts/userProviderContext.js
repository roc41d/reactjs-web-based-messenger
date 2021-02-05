import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { userReducer } from "../reducers/userReducer";
import axios from "axios";

import {
  UPDATE_USER,
  USER_ERROR,
} from "../reducers/userReducer";

const UserContext = createContext();

const initialState = {
  user: { name: '' },
};

const UserProviderContext = (props) => {
  const history = useHistory();
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const actions = {
    handleSignup: async (name, email, password, primaryLanguage) => {
        try {
          const res = await axios.post('', {
            name,
            email,
            password,
          });
          const data = res.data;
          dispatch({ type: UPDATE_USER, payload: data });
          history.push('/messenger');
        } catch (err) {
          if (err.message.includes('400')) {
            dispatch({
              type: USER_ERROR,
              payload: 'User already exists.',
            });
          }
          if (err.message.includes('500')) {
            dispatch({
              type: USER_ERROR,
              payload: 'Server error',
            });
          }
        }
      },

      handleLogin: async (email, password) => {
        try {
          const res = await axios.post('', { email, password });
          const data = res.data;
          if (res && (res.status === 200 || res.status === 201)) {
            await actions.getCurrenthUser();
            history.push('/messenger');
          }
  
          dispatch({ type: UPDATE_USER, payload: data });
          return res;
        } catch (err) {
          let errorMsg;
  
          dispatch({
            type: USER_ERROR,
            payload: errorMsg,
          });
        }
      },

      getCurrenthUser: async () => {
        try {
          const res = await axios.get('');
  
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
  };

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
