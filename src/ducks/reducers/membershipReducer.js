import axios from "axios";

const initialState = {};

const GET_MEMBERSHIP = "GET_MEMBERSHIP";

export function getMembership(id) {
  let membershipData = axios.get(`/api/membership/${id}`).then(membership => {
    return membership.data[0];
  });
  return {
    type: GET_MEMBERSHIP,
    payload: membershipData
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERSHIP + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
