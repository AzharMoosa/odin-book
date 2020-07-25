import React, { useReducer } from "react";
import PostContext from "./postContext";
import axios from "axios";
import postReducer from "./postReducer";
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_ERROR,
} from "../types";

const PostState = (props) => {
  const initalState = {
    posts: null,
    error: null,
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

  // Add Post
  const addPost = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("api/posts", formData, config);
      dispatch({ type: ADD_POST, payload: res.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  };

  // Delete Post

  // Update Post
  const updatePost = async (post) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`api/posts/${post._id}`, post, config);
      dispatch({ type: UPDATE_POST, payload: res.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        loading: state.loading,
        getPosts,
        addPost,
        updatePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
