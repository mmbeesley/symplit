import axios from "axios";

const initialState = [];

const GET_VIDEOS = "GET_VIDEOS";
const CREATE_VIDEO = "CREATE_VIDEO";
const UPDATE_VIDEO = "UPDATE_VIDEO";
const DELETE_VIDEO = "DELETE_VIDEO";

export const getVideos = id => {
  let videosData = axios.get(`/api/videos/${id}`).then(videos => {
    return videos.data;
  });
  return {
    type: GET_VIDEOS,
    payload: videosData
  };
};

export const createVideo = body => {
  let videosData = axios.post("/api/videos", body).then(videos => {
    return videos.data;
  });
  return {
    type: CREATE_VIDEO,
    payload: videosData
  };
};

export const updateVideo = (id, body) => {
  let videosData = axios.put(`/api/videos/${id}`, body).then(videos => {
    return videos.data;
  });
  return {
    type: UPDATE_VIDEO,
    payload: videosData
  };
};

export const deleteVideo = (id, bookId) => {
  let videosData = axios.delete(`/api/videos/${id}`).then(videos => {
    return videos.data;
  });
  return {
    type: DELETE_VIDEO,
    payload: videosData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS + "_FULFILLED":
      return [...action.payload];
    case CREATE_VIDEO + "_FULFILLED":
      return [...action.payload];
    case UPDATE_VIDEO + "_FULFILLED":
      return [...action.payload];
    case DELETE_VIDEO + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
