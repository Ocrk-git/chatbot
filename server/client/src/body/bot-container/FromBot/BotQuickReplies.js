import React, { useState, Fragment, useEffect } from "react";
import "./bot-messages-type-style/quickReplies.css";
import { connect } from "react-redux";
import {
  addMessages,
  userMessage,
  userMessageSent,
  hideQuickRepliesAction,
} from "../../../actions/userMessageAction";

import { botTypingMessageAction } from "../../../actions/botMessageActions";

const BotQuickReplies = ({
  image,
  message,
  options,
  addMessages,
  userMessage,
  hide,
  // homeButtonClick,
  // userMessageSent,
  // userMessageDelivered,
  hideQuickRepliesButton,
  hideQuickRepliesAction,
  botTypingMessageAction,
}) => {
  const [hideQuickReplies, setHideQuicReplies] = useState(true);
  var image = <img className='message-icon' src={image} alt='logo' />;
  var noImage = <div className='hide-message-icon' />;

  useEffect(() => {
    if (hideQuickRepliesButton) {
      setHideQuicReplies(false);
      hideQuickRepliesAction();
    }

    //eslint-disable-next-line
  }, [hideQuickRepliesButton]);

  const buttonClicked = (e) => {
    addMessages(e.target.outerText);
    userMessage(e.target.outerText);
    setHideQuicReplies(false);
    botTypingMessageAction();
  };
  return (
    <Fragment>
      <div className='from-bot'>
        {hide ? noImage : image}

        {/* <img className='message-icon' src={image} alt='logo' /> */}

        <div className='text-message'>
          <p>{message}</p>
        </div>
      </div>
      {hideQuickReplies && (
        <div className='qrs'>
          {options &&
            options.map((option, index) => (
              <button
                className='quickReplie'
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
  hideQuickRepliesButton: state.userMessage.hideQuickRepliesButton,
});

export default connect(mapStateToProps, {
  addMessages,
  userMessage,
  userMessageSent,
  hideQuickRepliesAction,
  botTypingMessageAction,
})(BotQuickReplies);
