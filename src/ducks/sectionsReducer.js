import axios from "axios";

const initialState = [];

const GET_SECTIONS = "GET_SECTIONS";
const CREATE_SECTION = "CREATE_SECTION";
const UPDATE_SECTION = "UPDATE_SECTION";
const DELETE_SECTION = "DELETE_SECTION";
const CREATE_SECTION_VIDEO = "CREATE_SECTION_VIDEO";
const UPDATE_SECTION_VIDEO = "UPDATE_SECTION_VIDEO";
const DELETE_SECTION_VIDEO = "DELETE_SECTION_VIDEO";

export const getSections = id => {
  let sectionsData = axios.get(`/api/sections/${id}`).then(sections => {
    return sections.data;
  });
  return {
    type: GET_SECTIONS,
    payload: sectionsData
  };
};

export const createSection = body => {
  let sectionsData = axios.post("/api/sections", body).then(sections => {
    return sections.data;
  });
  return {
    type: CREATE_SECTION,
    payload: sectionsData
  };
};

export const updateSection = (id, body) => {
  let sectionsData = axios.put(`/api/sections/${id}`, body).then(sections => {
    return sections.data;
  });
  return {
    type: UPDATE_SECTION,
    payload: sectionsData
  };
};

export const deleteSection = (id, bookId) => {
  let sectionsData = axios
    .delete(`/api/sections/${id}/${bookId}`)
    .then(sections => {
      return sections.data;
    });
  return {
    type: DELETE_SECTION,
    payload: sectionsData
  };
};

export const createSectionVideo = body => {
  let sectionsData = axios.post("/api/sectionvideos", body).then(sections => {
    return sections.data;
  });
  return {
    type: CREATE_SECTION_VIDEO,
    payload: sectionsData
  };
};

export const updateSectionVideo = (id, body) => {
  let sectionsData = axios
    .put(`/api/sectionvideos/${id}`, body)
    .then(sections => {
      return sections.data;
    });
  return {
    type: UPDATE_SECTION_VIDEO,
    payload: sectionsData
  };
};

export const deleteSectionVideo = id => {
  let sectionsData = axios.delete(`/api/sectionvideos/${id}`).then(sections => {
    return sections.data;
  });
  return {
    type: DELETE_SECTION_VIDEO,
    payload: sectionsData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SECTIONS + "_FULFILLED":
      return [...action.payload];
    case CREATE_SECTION + "_FULFILLED":
      return [...action.payload];
    case UPDATE_SECTION + "_FULFILLED":
      return [...action.payload];
    case DELETE_SECTION + "_FULFILLED":
      return [...action.payload];
    case CREATE_SECTION_VIDEO + "_FULFILLED":
      return [...action.payload];
    case UPDATE_SECTION_VIDEO + "_FULFILLED":
      return [...action.payload];
    case DELETE_SECTION_VIDEO + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
