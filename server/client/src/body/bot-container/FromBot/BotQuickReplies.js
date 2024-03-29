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
  // userMessageSent,
  // userMessageDelivered,
  hideQuickRepliesButton,
  hideQuickRepliesAction,
  botTypingMessageAction,
}) => {
  const [hideQuickReplies, setHideQuicReplies] = useState(true);
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
        <div className='bot-icon-messages'>
          {!hide && <img className='message-icon' src={image} alt='logo' />}
        </div>
        {/* {hide ? (
          <img className='hide-message-icon' src={hide} alt='no logo' />
        ) : (
        )} */}
        {/* <img className='message-icon' src={image} alt='logo' /> */}
        <div className='text-message'>
          <p>{message}</p>
        </div>
      </div>
      {hideQuickReplies && (
        <div className='qrs'>
          {options &&
            options.map((option, index) => {
              if (option.url) {
                return (
                  <a
                    href={option.url}
                    target='_blank'
                    // value={option.text}
                    className='quickReplieUrl'
                    key={index}
                    rel='noreferrer'
                  // onClick={buttonClicked}
                  >
                    {option.title}
                  </a>
                );
              } else {
                return (
                  <button
                    value={option.text}
                    className='quickReplie'
                    key={index}
                    onClick={buttonClicked}
                  >
                    {option.title}
                  </button>
                );
              }
            })}
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