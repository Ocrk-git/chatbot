import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import BotTextMessage from "./FromBot/BotTextMessage";
import FromUser from "./FromUser";
import BotQuickReplies from "./FromBot/BotQuickReplies";
import BotCards from "./FromBot/BotCards";
import ScrollToBottom from "react-scroll-to-bottom";
// import { getMessages } from "../../actions/messages";

import "./ChatContainer.css"

const ChatContainer = ({ messages }) => {
  return (
    // <section >
    <ScrollToBottom className='chat-container'>
    {/* <div className= "chat-container"> */}
      {messages &&
        //eslint-disable-next-line
        messages.map((item, index) => {
          if (item.messageFrom === "bot") {
            if (item.type === "text") {
              return (
                <BotTextMessage
                  key={index}
                  image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
                  message={item.message}
                />
              );
            } else if (item.type === "quickReply") {
              return (
                <BotQuickReplies
                  key={index}
                  image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
                  message={item.message}
                  options={item.options}
                />
              );
            } else if (item.type === "cards") {
              return <BotCards key={index} cards={item.cards} />;
            }
          } else if (item.messageFrom === "user") {
            return <FromUser key={index} message={item.message} />;
          } else {
            return {};
          }
        })}
        {/* </div> */}
    </ScrollToBottom>
  );
};
const mapStateToProps = (state) => ({
  messages: state.messageContainer.messages,
});
export default connect(mapStateToProps, {})(ChatContainer);
