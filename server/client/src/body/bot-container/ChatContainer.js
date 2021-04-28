import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BotTextMessage from "./FromBot/BotTextMessage";
import FromUser from "./FromUser";
import BotQuickReplies from "./FromBot/BotQuickReplies";
import BotCards from "./FromBot/BotCards";
import ScrollToBottom from "react-scroll-to-bottom";

import "./ChatContainer.css";
import BotTypingMessageDots from "./FromBot/BotTypingMessageDots";

const ChatContainer = ({ messages, showBotTyping }) => {
  const [messageCount, setMessageCount] = useState(0);

  const [newMessage, setNewMessage] = useState("");
  const [previousMessage, setPreviousMessage] = useState("");

  useEffect(() => {
    if (newMessage === "bot" && messageCount > 0) {
      setMessageCount(messageCount + 1);
      setPreviousMessage(newMessage);
    } else {
      setMessageCount(messageCount + 1);
    }
    //eslint-disable-next-line
  }, [newMessage]);

  const BotMessage = () => {
    // setNewMessage("bot");
    // setMessageCount(messageCount + 1);
  };
  const UserMessage = () => {
    // setNewMessage("user");
  };

  console.log(newMessage, "New Message");
  console.log(previousMessage, "Previous Message");
  console.log(messageCount, "Message Count");

  return (
    // <section >
    <ScrollToBottom className='chat-container'>
      {/* <div className= "chat-container"> */}
      {messages &&
        //eslint-disable-next-line
        messages.map((item, index) => {
          if (item.messageFrom === "bot") {
            BotMessage();
            if (item.type === "text") {
              return (
                <BotTextMessage
                  key={index}
                  item={index}
                  image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
                  message={item.message}
                />
              );
            } else if (item.type === "quickReply") {
              return (
                <BotQuickReplies
                  key={index}
                  item={index}
                  image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
                  message={item.message}
                  options={item.options}
                />
              );
            } else if (item.type === "cards") {
              return <BotCards key={index} item={index} cards={item.cards} />;
            }
          } else if (item.messageFrom === "user") {
            UserMessage();
            return <FromUser key={index} item={index} message={item.message} />;
          } else {
            return null;
          }
        })}
      {showBotTyping && <BotTypingMessageDots />}
    </ScrollToBottom>
  );
};
const mapStateToProps = (state) => ({
  messages: state.messageContainer.messages,
  showBotTyping: state.bot.botTypingBuble,
});
export default connect(mapStateToProps, {})(ChatContainer);
