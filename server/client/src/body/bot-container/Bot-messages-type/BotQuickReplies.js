import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { addMessages } from "../../../actions/messages";

const BotQuickReplies = ({ image, message, options, addMessages }) => {
  const [hideQuickReplies, setHideQuicReplies] = useState(true);

  const buttonClicked = (e) => {
    addMessages(e.target.outerText);
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
        <div className = "qrs">
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

// export default BotQuickReplies;
export default connect(null, { addMessages })(BotQuickReplies);
