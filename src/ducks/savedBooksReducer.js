import axios from "axios";

const initialState = [];

const GET_SAVED_BOOKS = "GET_SAVED_BOOKS";
const ADD_SAVED_BOOK = "ADD_SAVED_BOOK";
const REMOVE_SAVED_BOOK = "REMOVE_SAVED_BOOK";

export const getSavedBooks = () => {
  let savedBooksData = axios.get("/api/savedbooks").then(savedBooks => {
    return savedBooks.data;
  });
  return {
    type: GET_SAVED_BOOKS,
    payload: savedBooksData
  };
};

export const addSavedBook = id => {
  let savedBooksData = axios
    .post("/api/savedbooks", { book_id: id })
    .then(savedBooks => {
      return savedBooks.data;
    });
  return {
    type: ADD_SAVED_BOOK,
    payload: savedBooksData
  };
};

export const removeSavedBook = id => {
  let savedBooksData = axios
    .delete(`/api/savedbooks/${id}`)
    .then(savedBooks => {
      return savedBooks.data;
    });
  return {
    type: REMOVE_SAVED_BOOK,
    payload: savedBooksData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_BOOKS + "_FULFILLED":
      return [...action.payload];
    case ADD_SAVED_BOOK + "_FULFILLED":
      return [...action.payload];
    case REMOVE_SAVED_BOOK + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
