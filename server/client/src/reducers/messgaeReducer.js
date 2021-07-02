import { GET_MESSAGES, ADD_MESSAGES } from "../types/types";
import {
  BOT_TEXT_MESSAGE,
  BOT_QUICKREPLIES,
  BOT_CARDS,
  BOT_IMAGE,
  BOT_VIDEO,
} from "../types/types";

const initialState = {
  messages: [
    {
      messageFrom: "bot",
      type: "cards",
      cards: [
        {
          image:
            "http://eatwelltraveleverywhere.com/wp-content/uploads/2017/10/At.mosphere.jpg",
          title: "Banking",
          description:
            "Banking is an industry that handles cash, credit, and other financial transactions. Banks provide a safe place to store extra cash and credit.",
          actions: [
            {
              title: "Bhaskar",
              text: "button1",
              url: "",
            },
            {
              title: "Nandanna",
              text: "button2",
              url: "",
            },
            {
              title: "Dheeraj Anna",
              text: "text",
              url: "https://github.com/Ocrk-git/chatbot",
            },
          ],
        },
        {
          image:
            "https://i.pinimg.com/originals/39/47/03/394703864ace3f7c7fe232077f7d12f7.jpg",
          title: "Finance",
          description:
            "Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.",
          actions: [
            {
              title: "Dheeraj Anna",
              text: "text",
              url: "https://github.com/Ocrk-git/chatbot",
            },
          ],
        },

        {
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
          title: "Insurance",
          description:
            "This is essentially a back/next button positioned correctly. You must implement the textual description yourself, however, an example is provided below for reference.",
        },
      ],
    },

    // {
    //   messageFrom: "bot",
    //   type: "text",
    //   message: "Hey! Welcome to OCRK. How can I help you today?",
    // },

    {
      messageFrom: "bot",
      type: "image",
      image: "https://images5.alphacoders.com/484/484870.jpg",
    },
    {
      messageFrom: "bot",
      type: "video",
      video: "https://cdn.yellowmessenger.com/2yLMUv3B5Tn51620198798115.mp4",
    },
  ],
};

const messageReducer = (state = initialState, action) => {
  let message;
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

    case BOT_TEXT_MESSAGE:
      message = action.payload;
      let addMessage = {
        messageFrom: "bot",
        type: message.type,
        message: message.message,
      };

      return {
        ...state,
        messages: [...state.messages, addMessage],
      };

    case BOT_QUICKREPLIES:
      message = action.payload;
      let addQuickReply = {
        messageFrom: "bot",
        type: message.type,
        message: message.title,
        options: message.options,
      };

      return {
        ...state,
        messages: [...state.messages, addQuickReply],
      };
    case BOT_VIDEO:
      message = action.payload;
      let addVideo = {
        messageFrom: "bot",
        type: message.type,
        video: message.url,
      };

      return {
        ...state,
        messages: [...state.messages, addVideo],
      };

    case BOT_IMAGE:
      message = action.payload;
      let addImage = {
        messageFrom: "bot",
        type: message.type,
        image: message.url,
      };

      return {
        ...state,
        messages: [...state.messages, addImage],
      };
    case BOT_CARDS:
      message = action.payload;
      // let cards = []
      // for(let item of message){
      // }
      let addCards = {
        messageFrom: "bot",
        type: message.type,
        // message: message.title,
        // options: message.options,
        cards: message.message,
      };
      return {
        ...state,
        messages: [...state.messages, addCards],
      };

    default:
      return {
        ...state,
      };
  }
};

export default messageReducer;

// {
//   messageFrom: "bot",
//   type: "text",
//   message: "Hey! Welcome to OCRK. How can I help you today?",
// },
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
// {
//   messageFrom: "bot",
//   type: "cards",
//   cards:[
//     {
//       image:'http://eatwelltraveleverywhere.com/wp-content/uploads/2017/10/At.mosphere.jpg',
//       title:'Banking',
//       description:'Banking is an industry that handles cash, credit, and other financial transactions. Banks provide a safe place to store extra cash and credit.',
//     },
//     {
//       image:'https://i.pinimg.com/originals/39/47/03/394703864ace3f7c7fe232077f7d12f7.jpg',
//       title:'Finance',
//       description:'Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.',
//     },
//     {
//       image:'https://www.jtrholidays.com/static/img/bucket/Tours/Aerial-Tour/Burj-Khalifa/at-the-top-burj-khalifa.jpg',
//       title:'Education',
//       description:'Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.',
//     },
//     {
//       image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
//       title:'Insurance',
//       description:'This is essentially a back/next button positioned correctly. You must implement the textual description yourself, however, an example is provided below for reference.',
//     },
//   ]
// },
// {
//   messageFrom: "bot",
//   type: "text",
//   message: "Hey! Welcome to OCRK. How can I help you today?",
// },
