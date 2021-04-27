import { USER_MESSAGE, BOT_SENDING, HOME_BUTTON, USER_MESSAGE_SENT } from "../types/types";
import { userMessageSent } from "../actions/userMessageAction";

const initialState = {
  userMessage: "",
  userMessageDelivered: false,
  homeButtonClick: false,
};

const userMessage = (state = initialState, action) => {
  switch (action.type) {
    case USER_MESSAGE:
      return {
        userMessage: action.payload,
        userMessageDelivered: true,
      };
    case BOT_SENDING:
      return {
        ...state,
        botSendingMessage: !state.botSendingMessage,
      };
    case HOME_BUTTON:
      return {
        ...state,
        homeButtonClick: !state.homeButtonClick,
      };

      case USER_MESSAGE_SENT:
        return {
          ...state,
          userMessageDelivered: !state.userMessageDelivered,
        };

    default:
      return state;
  }
};

export default userMessage;
