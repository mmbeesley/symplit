import axios from "axios";

const initialState = {};

const GET_VIDEO = "GET_VIDEO";

export const getVideo = id => {
  let videoData = axios.get(`/api/video/${id}`).then(video => {
    return video.data[0];
  });
  return {
    type: GET_VIDEO,
    payload: videoData
  };
};

export const clearVideo = () => {
  return {
    type: GET_VIDEO,
    payload: {}
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
