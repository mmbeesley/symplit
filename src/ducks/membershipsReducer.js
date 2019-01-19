import axios from "axios";
import { clearChapter } from "./";

const initialState = [];

const GET_MEMBERSHIPS = "GET_MEMBERSHIPS";
const CREATE_MEMBERSHIP = "CREATE_MEMBERSHIP";
const UPDATE_MEMBERSHIP = "UPDATE_MEMBERSHIP";
const DELETE_MEMBERSHIP = "DELETE_MEMBERSHIP";
const MEMBERSHIP_AVAILABILITY = "MEMBERSHIP_AVAILABILITY";

export const getMemberships = () => {
  let membershipsData = axios.get(`/api/memberships`).then(memberships => {
    return memberships.data;
  });
  return {
    type: GET_MEMBERSHIPS,
    payload: membershipsData
  };
};

export const createMembership = body => {
  let membershipsData = axios
    .post("/api/memberships", body)
    .then(memberships => {
      return memberships.data;
    });
  return {
    type: CREATE_MEMBERSHIP,
    payload: membershipsData
  };
};

export const updateMembership = (id, body) => {
  let membershipsData = axios
    .put(`/api/membershipdetails/${id}`, body)
    .then(memberships => {
      return memberships.data;
    });
  return {
    type: UPDATE_MEMBERSHIP,
    payload: membershipsData
  };
};

export const deleteMembership = id => {
  let membershipsData = axios
    .delete(`/api/memberships/${id}`)
    .then(memberships => {
      return memberships.data;
    });
  return {
    type: DELETE_MEMBERSHIP,
    payload: membershipsData
  };
};

export const membershipAvailability = (id, boo) => {
  let membershipsData = axios
    .put(`/api/memberships/${id}`, { available: boo })
    .then(memberships => {
      return memberships.data;
    });
  return {
    type: MEMBERSHIP_AVAILABILITY,
    payload: membershipsData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERSHIPS + "_FULFILLED":
      return [...action.payload];
    case CREATE_MEMBERSHIP + "_FULFILLED":
      return [...action.payload];
    case UPDATE_MEMBERSHIP + "_FULFILLED":
      return [...action.payload];
    case DELETE_MEMBERSHIP + "_FULFILLED":
      return [...action.payload];
    case MEMBERSHIP_AVAILABILITY + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
