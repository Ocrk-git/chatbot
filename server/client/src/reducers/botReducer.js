import { BOT_TYPING_BUBBLE } from "../types/types";

const initialState = {
  // showWidget: false,
  // image: "https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif",
  // botName: "Amazon",
  // botTitle: "Amazon",
  // botDescription: "Work Hard, Have Fun, Make History",
  botTypingBuble: false,
};

const botReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOT_TYPING_BUBBLE:
      return {
        ...state,
        botTypingBuble: !state.botTypingBuble,
      };
    default:
      return state;
  }
};

export default botReducer;
