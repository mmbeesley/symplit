import axios from "axios";
import { clearProblem } from "./";

const initialState = [];

const GET_PROBLEMS = "GET_PROBLEMS";
const CREATE_PROBLEM = "CREATE_PROBLEM";
const UPDATE_PROBLEM = "UPDATE_PROBLEM";
const DELETE_PROBLEM = "DELETE_PROBLEM";

export const getProblems = id => {
  let problemsData = axios.get(`/api/problems/${id}`).then(problems => {
    return problems.data;
  });
  return {
    type: GET_PROBLEMS,
    payload: problemsData
  };
};

export const createProblem = body => {
  let problemsData = axios.post("/api/problems", body).then(problems => {
    return problems.data;
  });
  return {
    type: CREATE_PROBLEM,
    payload: problemsData
  };
};

export const updateProblem = (id, body) => {
  let problemsData = axios.put(`/api/problems/${id}`, body).then(problems => {
    clearProblem();
    return problems.data;
  });
  return {
    type: UPDATE_PROBLEM,
    payload: problemsData
  };
};

export const deleteProblem = (id, sectionId) => {
  let problemsData = axios
    .delete(`/api/problems/${id}/${sectionId}`)
    .then(problems => {
      clearProblem();
      return problems.data;
    });
  return {
    type: DELETE_PROBLEM,
    payload: problemsData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROBLEMS + "_FULFILLED":
      return [...action.payload];
    case CREATE_PROBLEM + "_FULFILLED":
      return [...action.payload];
    case UPDATE_PROBLEM + "_FULFILLED":
      return [...action.payload];
    case DELETE_PROBLEM + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
