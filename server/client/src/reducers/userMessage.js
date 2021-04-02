import { USER_MESSAGE } from "../types/types";

const initialState = {
    userMessage: "Hello"
};

const userMessage = (state = initialState, action) => {
    switch (action.type) {
        case USER_MESSAGE:
            return { 
                userMessage: action.payload
             }
        default:
            return state;
    }
};

export default userMessage;
