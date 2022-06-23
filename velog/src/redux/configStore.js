import { createStore, combineReducers,applyMiddleware } from "redux"
import thunk from "redux-thunk";
import post from "./modules/post"
import postDetail from "./modules/postDetail"
import comments from "./modules/comments"
import Tags from "./modules/tags"
import date from "./modules/date"
import likes from "./modules/likes"

const middlewares = [thunk];
const rootReducer = combineReducers({post, postDetail, comments, Tags, date, likes});
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;