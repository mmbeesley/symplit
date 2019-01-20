import axios from "axios";
import { clearChapter } from "./";

const initialState = [];

const GET_CHAPTERS = "GET_CHAPTERS";
const CREATE_CHAPTER = "CREATE_CHAPTER";
const UPDATE_CHAPTER = "UPDATE_CHAPTER";
const DELETE_CHAPTER = "DELETE_CHAPTER";

export const getChapters = id => {
  let chaptersData = axios.get(`/api/chapters/${id}`).then(chapters => {
    return chapters.data;
  });
  return {
    type: GET_CHAPTERS,
    payload: chaptersData
  };
};

export const createChapter = body => {
  let chaptersData = axios.post("/api/chapters", body).then(chapters => {
    return chapters.data;
  });
  return {
    type: CREATE_CHAPTER,
    payload: chaptersData
  };
};

export const updateChapter = (id, body) => {
  let chaptersData = axios.put(`/api/chapters/${id}`, body).then(chapters => {
    clearChapter();
    return chapters.data;
  });
  return {
    type: UPDATE_CHAPTER,
    payload: chaptersData
  };
};

export const deleteChapter = (id, bookId) => {
  let chaptersData = axios
    .delete(`/api/chapters/${id}/${bookId}`)
    .then(chapters => {
      clearChapter();
      return chapters.data;
    });
  return {
    type: DELETE_CHAPTER,
    payload: chaptersData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAPTERS + "_FULFILLED":
      return [...action.payload];
    case CREATE_CHAPTER + "_FULFILLED":
      return [...action.payload];
    case UPDATE_CHAPTER + "_FULFILLED":
      return [...action.payload];
    case DELETE_CHAPTER + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
