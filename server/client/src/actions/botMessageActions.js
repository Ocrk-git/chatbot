import {
  BOT_TEXT_MESSAGE,
  BOT_QUICKREPLIES,
  BOT_CARDS,
  BOT_SENDING,
  BOT_TYPING_BUBBLE,
} from "../types/types";

export const botTextMessage = (message) => (dispatch) => {
  dispatch({
    type: BOT_TEXT_MESSAGE,
    payload: message,
  });
};

export const botQuickReplies = (message) => (dispatch) => {
  dispatch({
    type: BOT_QUICKREPLIES,
    payload: message,
  });
};

export const botCards = (message) => (dispatch) => {
  dispatch({
    type: BOT_CARDS,
    payload: message,
  });
};

export const botSendingMessage = () => (dispatch) => {
  dispatch({
    type: BOT_SENDING,
  });
};

export const botTypingMessageAction = () => (dispatch) => {
  dispatch({
    type: BOT_TYPING_BUBBLE,
  });
};
