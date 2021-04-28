import {
  BOT_TEXT_MESSAGE,
  BOT_QUICKREPLIES,
  BOT_CARDS,
  BOT_SENDING,
  BOT_TYPING_BUBBLE,
} from "../types/types";

export const botTextMessage = (msg) => (dispatch) => {
  dispatch({
    type: BOT_TEXT_MESSAGE,
    payload: msg,
  });
};

export const botQuickReplies = (msg) => (dispatch) => {
  dispatch({
    type: BOT_QUICKREPLIES,
    payload: msg,
  });
};

export const botCards = (msg) => (dispatch) => {
  dispatch({
    type: BOT_CARDS,
    payload: msg,
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
