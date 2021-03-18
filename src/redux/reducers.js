import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import uploadReducer from "./uploudReducer";
import appUtils from "./appUtils";

const rootReducer = combineReducers({
     user:userReducer,
    files:fileReducer,
    upload:uploadReducer,
    utils:appUtils
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)) )








