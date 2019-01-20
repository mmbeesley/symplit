import axios from "axios";

const initialState = {};

const GET_BOOK = "GET_BOOK";

export const getBook = id => {
  let bookData = axios.get(`/api/book/${id}`).then(book => {
    return book.data[0];
  });
  return {
    type: GET_BOOK,
    payload: bookData
  };
};

export const clearBook = () => {
  return {
    type: GET_BOOK,
    payload: {}
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
