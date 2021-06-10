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
  var renderMessage = [];
  for (var i = 0; i < messages.length; i++) {
    if (
      messages[i].messageFrom === "bot" &&
      messages.length > i + 1 &&
      messages[i + 1].messageFrom === "bot"
    ) {
      console.log("Adding hide Icon");
      renderMessage.push({ ...messages[i], hide: true });
    } else {
      renderMessage.push(messages[i]);
    }
  }

  console.log(renderMessage, "Total render messages");

  return (
    // <section >
    <ScrollToBottom debug={false} className='chat-container'>
      {/* <div className= "chat-container"> */}
      {/* {renderMessage} */}
      {renderMessage &&
        //eslint-disable-next-line
        renderMessage.map((item, index) => {
          console.log(index, "message index");
          if (item.messageFrom === "bot") {
            if (item.type === "text") {
              return (
                <BotTextMessage
                  key={index}
                  messageFrom={item.messageFrom}
                  item={index}
                  hide={item.hide}
                  image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
                  message={item.message}
                />
              );
            } else if (item.type === "quickReply") {
              return (
                <BotQuickReplies
                  key={index}
                  item={index}
                  hide={item.hide}
                  image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
                  message={item.message}
                  options={item.options}
                />
              );
            } else if (item.type === "cards") {
              return (
                <BotCards
                  key={index}
                  item={index}
                  cards={item.cards}
                  hide={item.hide}
                  image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
                />
              );
            }
          } else if (item.messageFrom === "user") {
            return <FromUser key={index} item={index} message={item.message} />;
          } else {
            return null;
          }
        })}

      {/* {messages &&
        //eslint-disable-next-line
        for(var i=0; i<messages.length; i++) {
          console.log(index, "message index");

          if (item.messageFrom === "bot") {
            BotMessage();
            if (item.type === "text") {
              return (
                <BotTextMessage
                  key={index}
                  messageFrom={item.messageFrom}
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
        })} */}
      {showBotTyping && <BotTypingMessageDots />}
    </ScrollToBottom>
  );
};
const mapStateToProps = (state) => ({
  messages: state.messageContainer.messages,
  showBotTyping: state.bot.botTypingBuble,
});
export default connect(mapStateToProps, {})(ChatContainer);
