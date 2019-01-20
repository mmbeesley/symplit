import { createStore, applyMiddleware } from "redux";
import reducers from "./ducks/reducers";
import promiseMiddleware from "redux-promise-middleware";

export default createStore(reducers, applyMiddleware(promiseMiddleware()));
