import { combineReducers } from "redux";
import botReducer from "./botReducer";
import messageReducer from "./messgaeReducer";
import userMessage from "./userMessage"

export default combineReducers({
  bot: botReducer,
  messageContainer: messageReducer,
  userMessage
});
