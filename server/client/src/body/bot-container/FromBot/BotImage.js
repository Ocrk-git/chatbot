import React from "react";
import "./bot-messages-type-style/image.css";
const BotImage = ({ image, hide, imageItem }) => {
  return (
    <div className='from-bot'>
      <div className='bot-icon-messages'>
        {!hide && <img className='message-icon' src={image} alt='logo' />}
        <img
          className='message-icon'
          src='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
          alt='logo'
        />
      </div>
      <div className='image'>
        <img src={imageItem} alt='' />
      </div>
    </div>
  );
};

export default BotImage;
