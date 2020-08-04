import React, { useReducer } from "react";
import PostContext from "./postContext";
import axios from "axios";
import postReducer from "./postReducer";
import {
  GET_POST,
  GET_POSTS,
  GET_USER_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_ERROR,
  GET_POSTS_ID,
  CLEAR_CURRENT_POSTS,
} from "../types";

const PostState = (props) => {
  const initalState = {
    posts: null,
    current: null,
    error: null,
    loading: true,
    friends_posts: null,
    current_posts: null,
  };

  const [state, dispatch] = useReducer(postReducer, initalState);

  // Get Post
  const getPost = async (id) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({ type: GET_POST, payload: res.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  };

  // Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  };

  const getUserPosts = async (id) => {
    try {
      const res = await axios.get(`/api/users/posts/${id}`);
      dispatch({ type: GET_POSTS_ID, payload: res.data });
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
      const res = await axios.post("/api/posts", formData, config);
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
      const res = await axios.put(`/api/posts/${post._id}`, post, config);
      dispatch({ type: UPDATE_POST, payload: res.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  };

  // Clear Current Posts
  const clearCurrentPosts = () => {
    dispatch({ type: CLEAR_CURRENT_POSTS });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        friends_posts: state.friends_posts,
        error: state.error,
        loading: state.loading,
        current_posts: state.current_posts,
        getPost,
        getPosts,
        addPost,
        updatePost,
        getUserPosts,
        clearCurrentPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
