import React, { useState } from "react";
import { connect } from "react-redux";
import { addMessages, userMessage } from "../../../actions/userMessageAction";
import { botTypingMessageAction } from "../../../actions/botMessageActions";
import "./bot-messages-type-style/rating.css";
import { FaStar } from "react-icons/fa";
const BotRating = ({
  addMessages,
  userMessage,
  botTypingMessageAction,
  hide,
  image,
  options,
}) => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const sendInputHandler = (event) => {
    setRating(event.target.value);
    console.log("USER_RATING - ", event.target.value);
    event.preventDefault();
    addMessages(event.target.value);
    userMessage(event.target.value);
    botTypingMessageAction();
  };
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
              {!rating && (
                <input
                  type='radio'
                  name='rating'
                  value={ratingIndex}
                  onClick={sendInputHandler}
                />
              )}
              <FaStar
                className='star'
                onMouseEnter={() => !rating && setHoverRating(ratingIndex)}
                onMouseLeave={() => !rating && setHoverRating(ratingIndex)}
                color={
                  ratingIndex <= (hoverRating || rating) ? "#ffc107" : "grey"
                }
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