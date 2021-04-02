import { GET_MESSAGES, ADD_MESSAGES } from "../types/types";

const initialState = {
  messages: [
    {
      messageFrom: "bot",
      type: "text",
      message: "Hey! Welcome to OCRK. How can I help you today?",
    },
    // {
    //   messageFrom: "bot",
    //   type: "quickReply",
    //   message: "It's Awesome to know that we support Quick replies.",
    //   options: [
    //     {
    //       title: "Raise request",
    //       text: "Raise request",
    //     },
    //     {
    //       title: "Feedback",
    //       text: "Feedback",
    //     },
    //   ],
    // },
    {
      messageFrom: "bot",
      type: "cards",
      cards:[
        {
          image:'http://eatwelltraveleverywhere.com/wp-content/uploads/2017/10/At.mosphere.jpg',
          title:'Banking',
          description:'Banking is an industry that handles cash, credit, and other financial transactions. Banks provide a safe place to store extra cash and credit.',
        },
        {
          image:'https://i.pinimg.com/originals/39/47/03/394703864ace3f7c7fe232077f7d12f7.jpg',
          title:'Finance',
          description:'Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.',
        },
        {
          image:'https://www.jtrholidays.com/static/img/bucket/Tours/Aerial-Tour/Burj-Khalifa/at-the-top-burj-khalifa.jpg',
          title:'Education',
          description:'Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.',
        },
        {
          image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
          title:'Insurance',
          description:'This is essentially a back/next button positioned correctly. You must implement the textual description yourself, however, an example is provided below for reference.',
        },

      ]

    },
    {
      messageFrom: "bot",
      type: "text",
      message: "Hey! Welcome to OCRK. How can I help you today?",
    },

 

    // {
    //   messageFrom: "user",
    //   type: "text",
    //   message: "hello",
    // },
  ],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return [...state];
    case ADD_MESSAGES:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            messageFrom: "user",
            type: "text",
            message: action.payload,
          },
        ],
      };
    default:
      return state;
  }
};

export default messageReducer;