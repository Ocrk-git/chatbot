import {
  USER_MESSAGE,
  BOT_SENDING,
  HOME_BUTTON,
  USER_MESSAGE_SENT,
  HIDE_QUICK_REPLIES,
} from "../types/types";

const initialState = {
  userMessage: "",
  userMessageDelivered: false,
  homeButtonClick: false,
  hideQuickRepliesButton: false,
};

const userMessage = (state = initialState, action) => {
  switch (action.type) {
    case USER_MESSAGE:
      return {
        userMessage: action.payload,
        userMessageDelivered: true,
        hideQuickRepliesButton: true,
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
        hideQuickRepliesButton: true,
      };

    case USER_MESSAGE_SENT:
      return {
        ...state,
        userMessageDelivered: !state.userMessageDelivered,
      };

    case HIDE_QUICK_REPLIES:
      return {
        ...state,
        hideQuickRepliesButton: false,
      };
    default:
      return state;
  }
};

export default userMessage;
