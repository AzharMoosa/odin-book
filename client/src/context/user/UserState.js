import React, { useReducer } from "react";
import UserContext from "./userContext";
import axios from "axios";
import userReducer from "./userReducer";
import { GET_USER, GET_USERS, UPDATE_USER, USER_ERROR } from "../types";

const UserState = (props) => {
  const initalState = {
    user: null,
    loading: true,
    users_list: null,
  };

  const [state, dispatch] = useReducer(userReducer, initalState);

  // Get User
  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  // Update User
  const updateUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = axios.put(`/api/users/${user.id}`, user, config);
      dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users_list: state.users_list,
        loading: state.loading,
        getUser,
        updateUser,
        getUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
