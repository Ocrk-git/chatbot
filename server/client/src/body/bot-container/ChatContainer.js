import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import BotTextMessage from "./FromBot/BotTextMessage";
import FromUser from "./FromUser";
import BotQuickReplies from "./FromBot/BotQuickReplies";
import BotCards from "./FromBot/BotCards";
import BotVideo from "./FromBot/BotVideo";
import BotImage from "./FromBot/BotImage";
import BotRating from "./FromBot/BotRating";
// import NewBotCards from "./FromBot/BotCards";

// import ScrollToBottom from "react-scroll-to-bottom";

import "./ChatContainer.css";
import BotTypingMessageDots from "./FromBot/BotTypingMessageDots";

const ChatContainer = ({ messages, showBotTyping, homeButtonState }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // console.log("SCROLLING DOWN.................");
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  if (homeButtonState) {
    // console.log(homeButtonState, "HOME BUTTON CLICKED");
    scrollToBottom();
    setTimeout(scrollToBottom, 2000);
  }
  useEffect(scrollToBottom, [messages]);
  var renderMessage = [];
  for (var i = 0; i < messages.length; i++) {
    if (
      messages[i].messageFrom === "bot" &&
      messages.length > i + 1 &&
      messages[i + 1].messageFrom === "bot"
    ) {
      // console.log("Adding hide Icon");
      renderMessage.push({ ...messages[i], hide: true });
    } else {
      renderMessage.push(messages[i]);
    }
  }

  return (
    // <section >
    <div className='chat-container'>
      {renderMessage &&
        //eslint-disable-next-line
        renderMessage.map((item, index) => {
          if (item.messageFrom === "bot") {
            if (item.type === "text") {
              return (
                <BotTextMessage
                  key={index}
                  messageFrom={item.messageFrom}
                  item={index}
                  hide={item.hide}
                  image='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
                  message={item.message}
                />
              );
            } else if (item.type === "quickReply") {
              // console.log("quickReply Item",item)
              return (
                <BotQuickReplies
                  key={index}
                  item={index}
                  hide={item.hide}
                  image='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
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
                  options={item.options}
                  image='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
                />
              );
            } else if (item.type === "video") {
              return (
                <BotVideo
                  key={index}
                  item={index}
                  hide={item.hide}
                  video={item.video}
                  image='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
                />
              );
            } else if (item.type === "image") {
              console.log("Item",item);
              return (
                <BotImage
                  key={index}
                  item={index}
                  hide={item.hide}
                  imageItem={item.image}
                  image='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
                />
              );
            } else if (item.type === "rating") {
              return (
                <BotRating
                  key={index}
                  item={index}
                  hide={item.hide}
                  options={item.options}
                  image='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
                />
              );
            }
          } else if (item.messageFrom === "user") {
            return <FromUser key={index} item={index} message={item.message} />;
          }
        })}
      {showBotTyping && <BotTypingMessageDots />}
      <div
        style={{
          display: "flex",
          minHeight: "60px",
          bottom: "0px",
          // backgroundColor: "blue",
          color: "red",
        }}
        ref={messagesEndRef}
      ></div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  messages: state.messageContainer.messages,
  showBotTyping: state.bot.botTypingBuble,
  homeButtonState: state.userMessage.homeButtonClick,
});
export default connect(mapStateToProps, {})(ChatContainer);
