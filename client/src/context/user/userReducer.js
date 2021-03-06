import {
  GET_USER,
  GET_USERS,
  UPDATE_USER,
  USER_ERROR,
  GET_USER_POSTS,
  GET_USER_ID,
  CLEAR_CURRENT_USER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users_list: action.payload,
        loading: false,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        friends_posts: action.payload,
        loading: false,
      };
    case GET_USER_ID:
      return {
        ...state,
        current_user: action.payload,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: state.user,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        current_user: null,
      };
    default:
      return state;
  }
};
