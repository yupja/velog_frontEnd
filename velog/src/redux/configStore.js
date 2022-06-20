import { createStore, combineReducers,applyMiddleware } from "redux"
import thunk from "redux-thunk";

const middlewares = [thunk];
// const rootReducer = combineReducers({});
// const enhancer = applyMiddleware(...middlewares);
const store = createStore();

export default store;