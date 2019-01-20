import axios from "axios";

const initialState = [];

const GET_BOOK_SECTIONS = "GET_BOOK_SECTIONS";

export const getBookSections = id => {
  let sectionsData = axios.get(`/api/booksections/${id}`).then(sections => {
    return sections.data;
  });
  return {
    type: GET_BOOK_SECTIONS,
    payload: sectionsData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_SECTIONS + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
