import axios from "axios";
import { clearBook } from "./";

const initialState = [];

const GET_BOOKS = "GET_BOOKS";
const SEARCH_BOOKS = "SEARC_BOOKS";
const CREATE_BOOK = "CREATE_BOOK";
const UPDATE_BOOK = "UPDATE_BOOK";
const DELETE_BOOK = "DELETE_BOOK";

export const getBooks = () => {
  let booksData = axios.get("/api/books").then(books => {
    return books.data;
  });
  return {
    type: GET_BOOKS,
    payload: booksData
  };
};

export const searchBooks = string => {
  let booksData = axios.get(`/api/books/search?book=${string}`).then(books => {
    return books.data;
  });
  return {
    type: SEARCH_BOOKS,
    payload: booksData
  };
};

export const createBook = body => {
  let booksData = axios.post("/api/books", body).then(books => {
    return books.data;
  });
  return {
    type: CREATE_BOOK,
    payload: booksData
  };
};

export const updateBook = (id, body) => {
  let booksData = axios.put(`/api/books/${id}`, body).then(books => {
    clearBook();
    return books.data;
  });
  return {
    type: UPDATE_BOOK,
    payload: booksData
  };
};

export const deleteBook = id => {
  let booksData = axios.delete(`/api/books/${id}`).then(books => {
    clearBook();
    return books.data;
  });
  return {
    type: DELETE_BOOK,
    payload: booksData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS + "_FULFILLED":
      return [...action.payload];
    case SEARCH_BOOKS + "_FULFILLED":
      return [...action.payload];
    case CREATE_BOOK + "_FULFILLED":
      return [...action.payload];
    case UPDATE_BOOK + "_FULFILLED":
      return [...action.payload];
    case DELETE_BOOK + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
