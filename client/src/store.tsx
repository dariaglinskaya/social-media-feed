import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { feed } from './reducers/feedReducer';

const store: any = createStore(feed, applyMiddleware(logger, thunk));
export default store;