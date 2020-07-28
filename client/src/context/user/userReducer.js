import { GET_USER, GET_USERS, UPDATE_USER, USER_ERROR } from "../types";

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
    default:
      return state;
  }
};
