import React, { useState, useEffect } from "react";
import "./bot-messages-type-style/textMessage.css";

const BotTextMessage = (props) => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    // if (props.item) {
    setKeys((key) => [...key, props.item]);
    // }
  }, [props.item]);
  console.log(keys, "message total keys");

  return (
    <div className='from-bot'>
      <img className='message-icon' src={props.image} alt='logo' />
      <div className='text-message'>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default BotTextMessage;
