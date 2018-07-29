import axios from "axios";

const initialState = {};

const GET_PROBLEM = "GET_PROBLEM";

export const getProblem = id => {
  let problemData = axios.get(`/api/problem/${id}`).then(problem => {
    return problem.data;
  });
  return {
    type: GET_PROBLEM,
    payload: problemData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROBLEM + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
