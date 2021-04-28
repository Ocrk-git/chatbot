import React, { useEffect, useState, Fragment } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import {
  botTextMessage,
  botQuickReplies,
  botCards,
} from "./actions/botMessageActions";
import { homeButton } from "./actions/userMessageAction";

import { botTypingMessageAction } from "./actions/botMessageActions";

let socket;

const Socket = ({
  userMessage,
  botCards,
  botQuickReplies,
  botTextMessage,
  homeButton,
  homeButtonClick,
  botTypingMessageAction,
}) => {
  const endPoint = "http://localhost:5000";
  // console.log("executing socket component");
  const [data, setData] = useState(true);

  useEffect(() => {
    socket = io(endPoint, {
      transports: ["websocket"],
    });
    socket.on("welcome", (messages) => {
      console.log("Welcome Message from app.js", messages);
      if (messages) {
        for (let message of messages) {
          if (message.type === "text") {
            botTextMessage(message);
          } else if (message.type === "quickReply") {
            console.log(message, "quick replies");
            botQuickReplies(message);
          } else if (message.type === "cards") {
            botCards(message);
          } else {
            return null;
          }
        }
      }
    });
    return () => {};
    //eslint-disable-next-line
  }, [endPoint]);

  // Sending user message to bot

  useEffect(() => {
    if (userMessage) {
      console.log("This is from client side (user message)", userMessage);
      socket.emit("sendMessage", userMessage);
    }
    if (data) {
      console.log("is data in pipeline");
      setData(false);

      // Receiving message from bot
      socket.on("botMessage", async (messages) => {
        // console.log(messages, "bot message");
        console.log(messages.length, "bot messages length");

        if (messages) {
          var interval = 1 * 1000; // 10 seconds;
          for (var i = 0; i <= messages.length - 1; i++) {
            setTimeout(
              async function (i) {
                if (messages[i].type === "text") {
                  await botTextMessage(messages[i]);
                } else if (messages[i].type === "quickReply") {
                  console.log(messages[i], "quick replies");
                  await botQuickReplies(messages[i]);
                } else if (messages[i].type === "cards") {
                  await botCards(messages[i]);
                } else {
                  return null;
                }
              },
              interval * i,
              i
            );
          }

          // for (let message of messages) {
          //   if (message.type === "text") {
          //     botTextMessage(message);
          //   } else if (message.type === "quickReply") {
          //     console.log(message, "quick replies");
          //     botQuickReplies(message);
          //   } else if (message.type === "cards") {
          //     botCards(message);
          //   } else {
          //     return null;
          //   }
          // }
          if (messages.length === 1) {
            botTypingMessageAction();
          } else {
            setTimeout(() => {
              botTypingMessageAction();
            }, 1 * 1000);
          }
        }
      });
    }

    // return () => {};
    //eslint-disable-next-line
  }, [userMessage]);

  //On clicking home button

  useEffect(() => {
    if (homeButtonClick) {
      console.log(homeButtonClick, "HOME BUTTON IS:");
      socket.emit("defaultMessage");
      homeButton();
    }
    //eslint-disable-next-line
  }, [homeButtonClick]);

  return <Fragment> </Fragment>;
};
const mapStateToProps = (state) => ({
  userMessage: state.userMessage.userMessage,
  homeButtonClick: state.userMessage.homeButtonClick,
});
export default connect(mapStateToProps, {
  botTextMessage,
  botQuickReplies,
  botCards,
  homeButton,
  botTypingMessageAction,
})(Socket);
