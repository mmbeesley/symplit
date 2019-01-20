import axios from "axios";
import * as types from "../constants/types";
import {
  startTransaction,
  endTransaction,
  logClientError,
  logNetworkError,
  logoutUser
} from "../actions";

const baseUrl = "/api";

const api = ({ dispatch }) => next => action => {
  if (action.type !== types.API) {
    return next(action);
  }

  const { method, path, body, success, failure, storeName } = action.payload;

  const label = `${method}${path}`;

  dispatch(startTransaction(storeName));

  return axios[method](`${baseUrl}${path}`, body && body)
    .then(res => {
      dispatch(success(res));
      dispatch(endTransaction(storeName));
    })
    .catch(err => {
      console.log("hit catch", action, label, err);
      if (err.response && err.response.status !== 200) {
        dispatch(logNetworkError(err, label));
      } else {
        dispatch(logClientError(err, action));
      }
      if (failure) dispatch(failure(err));
      if (err.response && err.response.status === 401) dispatch(logoutUser());
      dispatch(endTransaction(storeName));
    });
};

export default api;
