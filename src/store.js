import { createStore, applyMiddleware } from "redux";
import reducers from "./ducks";
import promiseMiddleware from "redux-promise-middleware";

export default createStore(reducers, applyMiddleware(promiseMiddleware()));
