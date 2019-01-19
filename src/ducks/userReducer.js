import axios from "axios";

// import { getMembership } from "./";

const initialState = {};

const GET_USER_INFO = "GET_USER_INFO";

export function getUserInfo() {
  let userData = axios.get("/auth/me").then(user => {
    if (user.data === "User not found.") return {};
    return user.data;
  });
  return {
    type: GET_USER_INFO,
    payload: userData
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
