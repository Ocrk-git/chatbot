import { USER_MESSAGE, BOT_SENDING } from "../types/types";

const initialState = {
  userMessage: "",
  botSendingMessage: true,
};

const userMessage = (state = initialState, action) => {
  switch (action.type) {
    case USER_MESSAGE:
      return {
        userMessage: action.payload,
      };
    case BOT_SENDING:
      return {
        ...state,
        botSendingMessage: !state.botSendingMessage,
      };
    default:
      return state;
  }
};

export default userMessage;
