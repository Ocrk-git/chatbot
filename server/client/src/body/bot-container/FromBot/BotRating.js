import React, { useState } from "react";

import { connect } from "react-redux";
import { addMessages, userMessage } from "../../../actions/userMessageAction";
import { botTypingMessageAction } from "../../../actions/botMessageActions";
import "./bot-messages-type-style/rating.css";
import { FaStar } from "react-icons/fa";
const BotRating = ({
  addMessage,
  userMessage,
  botTypingMessageAction,
  hide,
  image,
  options,
}) => {
  const [rating, setRating] = useState(null);
  const sendInputHandler = (event) => {
    setRating(event.target.value);
    event.preventDefault();
    addMessages(rating);
    userMessage(rating);
    botTypingMessageAction();
    console.log("USER_RATING - ", rating);
  };
  console.log(options.value, "GIVEN RATING");
  console.log(rating, "RATING SELECTED");

  return (
    <div className='from-bot'>
      <div className='bot-icon-messages'>
        {!hide && <img className='message-icon' src={image} alt='logo' />}
      </div>
      <div className='star-rating'>
        {[...Array(options.value ? options.value : 5)].map((star, index) => {
          const ratingIndex = index + 1;
          return (
            <label key={index}>
              <input
                type='radio'
                name='rating'
                value={ratingIndex}
                onClick={sendInputHandler}
              />
              <FaStar
                className='star'
                color={ratingIndex <= rating ? "#ffc107" : "grey"}
                size={30}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default connect(null, {
  addMessages,
  userMessage,
  botTypingMessageAction,
})(BotRating);
