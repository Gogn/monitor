import {combineReducers} from "redux";
import authReducer from "./authReducer";
import appReducer from "./appReducer";

export default combineReducers({
  auth: authReducer,
  app: appReducer
})
