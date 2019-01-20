import * as types from "../constants/types";
import {
  reduxPostHelper,
  reduxPutHelper,
  reduxDeleteHelper
} from "../../utililies/helpers";

const getCallback = ({ data }) => dispatch => {
  dispatch({
    type: types.BOOKS_GET,
    payload: { data }
  });
};

const searchCallback = ({ data }) => dispatch => {
  dispatch({
    type: types.BOOKS_SEARCH,
    payload: { data }
  });
};

const postCallback = ({ data }) => dispatch => {
  dispatch({
    type: types.BOOKS_POST,
    payload: { data }
  });
};

const putCallback = ({ data }) => dispatch => {
  dispatch({
    type: types.BOOKS_GET,
    payload: { data }
  });
};

const deleteCallback = ({ data }) => dispatch => {
  dispatch({
    type: types.BOOKS_GET,
    payload: { data }
  });
};
