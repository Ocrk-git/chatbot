import { GET_MESSAGES, ADD_MESSAGES, USER_MESSAGE } from "../types/types";


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
}
