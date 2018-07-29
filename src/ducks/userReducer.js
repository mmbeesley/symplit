import axios from "axios";

const initialState = {};

const GET_USER_INFO = "GET_USER_INFO";

export function getUserInfo() {
  let userData = axios.get("/auth/me").then(user => {
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
