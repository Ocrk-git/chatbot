import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { addMessages, userMessage } from "../../../actions/messages";

const BotQuickReplies = ({
  image,
  message,
  options,
  addMessages,
  userMessage,
}) => {
  const [hideQuickReplies, setHideQuicReplies] = useState(true);

  const buttonClicked = (e) => {
    addMessages(e.target.outerText);
    userMessage(e.target.outerText);
    setHideQuicReplies(false);
  };
  return (
    <Fragment>
      <div className='from-bot'>
        <img className='message-icon' src={image} alt='logo' />

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

export default connect(null, { addMessages, userMessage })(BotQuickReplies);
