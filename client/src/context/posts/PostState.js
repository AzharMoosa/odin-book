import React, { useReducer } from "react";
import PostContext from "./postContext";
import axios from "axios";
import postReducer from "./postReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_ERROR,
} from "../types";

const PostState = (props) => {
  const initalState = {
    posts: [],
    error: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(postReducer, initalState);

  // Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get("api/posts");
      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  };

  // Create Posts

  // Delete Posts

  // Update Posts

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        loading: state.loading,
        getPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
