import axios from "axios";

const initialState = [];

const GET_COMPLETED_PROBLEMS = "GET_COMPLETED_PROBLEMS";
const COMPLETE_PROBLEM = "COMPLETE_PROBLEM";
const UNDO_COMPLETE_PROBLEM = "UNDO_COMPLETE_PROBLEM";

export const getCompletedProblems = () => {
  let problemsData = axios.get("/api/completedproblems").then(problems => {
    return problems.data;
  });
  return {
    type: GET_COMPLETED_PROBLEMS,
    payload: problemsData
  };
};

export const completeProblem = body => {
  let problemsData = axios.post("/api/completeproblem", body).then(problems => {
    return problems.data;
  });
  return {
    type: COMPLETE_PROBLEM,
    payload: problemsData
  };
};

export const undoCompleteProblem = (id, sectionId) => {
  let problemsData = axios
    .delete(`/api/uncompleteproblem/${id}/${sectionId}`)
    .then(problems => {
      return problems.data;
    });
  return {
    type: UNDO_COMPLETE_PROBLEM,
    payload: problemsData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPLETED_PROBLEMS + "_FULFILLED":
      return [...action.payload];
    case COMPLETE_PROBLEM + "_FULFILLED":
      return [...action.payload];
    case UNDO_COMPLETE_PROBLEM + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
