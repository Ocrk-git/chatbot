import {
  GET_MESSAGES,
  ADD_MESSAGES,
  USER_MESSAGE,
  USER_ACTION_MESSAGE,
  HOME_BUTTON,
  USER_MESSAGE_SENT,
  HIDE_QUICK_REPLIES,
} from "../types/types";

export const getMessages = () => (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
    // payload,
  });
};
export const addMessages = (message) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGES,
    payload: message,
  });
};
export const userMessage = (message) => (dispatch) => {
  dispatch({
    type: USER_MESSAGE,
    payload: message,
  });
};
export const userActionMessage = (message) => (dispatch) => {
  dispatch({
    type: USER_ACTION_MESSAGE,
    payload: message,
  });
};

export const homeButton = () => (dispatch) => {
  dispatch({
    type: HOME_BUTTON,
  });
};

export const userMessageSent = () => (dispatch) => {
  dispatch({
    type: USER_MESSAGE_SENT,
  });
};

export const hideQuickRepliesAction = () => (dispatch) => {
  dispatch({
    type: HIDE_QUICK_REPLIES,
  });
};
