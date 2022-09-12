import React, { createContext, useReducer } from "react";
import { USER_INFO } from "./actionTypes";

//initial state
const initialState = {
  userInfo: {
    email: '',
    member: '',
    name: '',
    id: 0,
  },
};

// create context
const Context = createContext({});

// create reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// create Provider component (High order component)
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };