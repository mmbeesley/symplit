import axios from "axios";

const initialState = {};

const GET_CHAPTER = "GET_CHAPTER";

export const getChapter = id => {
  let chapterData = axios.get(`/api/chapter/${id}`).then(chapter => {
    return chapter.data[0];
  });
  return {
    type: GET_CHAPTER,
    payload: chapterData
  };
};

export const clearChapter = () => {
  return {
    type: GET_CHAPTER,
    payload: {}
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAPTER + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
