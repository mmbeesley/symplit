import axios from "axios";

const initialState = {};

const GET_SECTION = "GET_SECTION";

export const getSection = (id, chapter) => {
  let sectionData = axios.get(`/api/section/${id}/${chapter}`).then(section => {
    return section.data[0];
  });
  return {
    type: GET_SECTION,
    payload: sectionData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SECTION + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
