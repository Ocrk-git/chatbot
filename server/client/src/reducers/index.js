import { combineReducers } from "redux";
import botReducer from "./botReducer";
import messageReducer from "./messgaeReducer";
import userMessage from "./userMessageReducer"

export default combineReducers({
  bot: botReducer,
  messageContainer: messageReducer,
  userMessage
});
