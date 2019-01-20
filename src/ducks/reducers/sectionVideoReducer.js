import axios from "axios";

const initialState = {};

const GET_SECTION_VIDEO = "GET_SECTION_VIDEO";

export const getSectionVideo = id => {
  let sectionVideoData = axios
    .get(`/api/section_video/${id}`)
    .then(sectionVideo => {
      return sectionVideo.data[0];
    });
  return {
    type: GET_SECTION_VIDEO,
    payload: sectionVideoData
  };
};

export const clearSectionVideo = () => {
  return {
    type: GET_SECTION_VIDEO,
    payload: {}
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SECTION_VIDEO + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
