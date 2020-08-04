import React, { useReducer } from "react";
import UserContext from "./userContext";
import axios from "axios";
import userReducer from "./userReducer";
import {
  GET_USER,
  GET_USERS,
  UPDATE_USER,
  USER_ERROR,
  GET_USER_POSTS,
} from "../types";

const UserState = (props) => {
  const initalState = {
    user: null,
    loading: true,
    users_list: null,
    friends_posts: null,
  };

  const [state, dispatch] = useReducer(userReducer, initalState);

  // Get User
  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err });
    }
  };

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err });
    }
  };

  const getUsersPost = async () => {
    try {
      const res = await axios.get(`/api/users/posts`);
      dispatch({ type: GET_USER_POSTS, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err });
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
      const res = await axios.put(`/api/users/${user.id}`, user, config);
      dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users_list: state.users_list,
        loading: state.loading,
        friends_posts: state.friends_posts,
        getUser,
        updateUser,
        getUsers,
        getUsersPost,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
