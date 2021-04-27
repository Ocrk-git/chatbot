import React, { useState, Fragment, useEffect } from "react";
import "./bot-messages-type-style/quickReplies.css";
import { connect } from "react-redux";
import {
  addMessages,
  userMessage,
  homeButton,
  userMessageSent
} from "../../../actions/userMessageAction";

const BotQuickReplies = ({
  image,
  message,
  options,
  addMessages,
  userMessage,
  homeButtonClick,
  userMessageSent,
  userMessageDelivered
}) => {
  const [hideQuickReplies, setHideQuicReplies] = useState(true);

  useEffect(() => {
    if (homeButtonClick) {
      setHideQuicReplies(false);
    }
    else if(userMessageDelivered){
      setHideQuicReplies(false);
      userMessageSent()
    }
  }, [homeButtonClick, userMessageDelivered]);

  const buttonClicked = (e) => {
    addMessages(e.target.outerText);
    userMessage(e.target.outerText);
    setHideQuicReplies(false);
  };
  return (
    <Fragment>
      <div className="from-bot">
        <img className="message-icon" src={image} alt="logo" />

        <div className="text-message">
          <p>{message}</p>
        </div>
      </div>
      {hideQuickReplies && (
        <div className="qrs">
          {options &&
            options.map((option, index) => (
              <button
                className="quickReplie"
                key={index}
                onClick={buttonClicked}
              >
                {option.title}
              </button>
            ))}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userMessageDelivered: state.userMessage.userMessageDelivered,
  homeButtonClick: state.userMessage.homeButtonClick,
});

export default connect(mapStateToProps, { addMessages, userMessage,userMessageSent })(
  BotQuickReplies
);
