import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import BotTextMessage from "./Bot-messages-type/BotTextMessage";
import FromUser from "./FromUser";
import BotQuickReplies from "./Bot-messages-type/BotQuickReplies";
import BotCards from "./Bot-messages-type/BotCards";
// import { getMessages } from "../../actions/messages";

const ChatContainer = ({ messages }) => {
  // useEffect(() => {
  //   getMessages();
  // }, []);
  console.log(messages, "helo");

  return (
    <section className="chat-container">
      {messages.map((item, index) => {
        if (item.messageFrom === "bot") {
          if (item.type === "text") {
            return (
              <BotTextMessage
                key={index}
                image="https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif"
                message={item.message}
              />
            );
          } else if (item.type === "quickReply") {
            return(
              <BotQuickReplies
                key={index}
                image="https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif"
                message={item.message}
                options={item.options}
              />
            )
          } else if (item.type === "cards") {
            return (
              <BotCards
                key={index}
                cards = {item.cards}
              />
            )
          }

        } else if (item.messageFrom === "user") {
          return <FromUser key={index} message={item.message} />;
        } else {
          return null;
        }
      })}
    </section>
  );
};
const mapStateToProps = (state) => ({
  messages: state.messageContainer.messages,
});
export default connect(mapStateToProps, {})(ChatContainer);
