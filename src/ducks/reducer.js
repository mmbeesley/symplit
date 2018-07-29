const initialState = {
  path: ""
};

const GET_PATH = "GET_PATH";

export function getPath(path) {
  return {
    type: GET_PATH,
    payload: path
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATH:
      return Object.assign({}, state, { path: action.payload });
    default:
      return state;
  }
}
