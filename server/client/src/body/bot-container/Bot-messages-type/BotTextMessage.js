import React from "react";

const BotTextMessage = (props) => {
  return (
    <div className="from-bot">
      <img
        className="message-icon"
        src={props.image}
        alt="logo"
      />
      <div className="text-message">
        <p>{props.message}</p>
      </div>
      
    </div>
    
  );
};

export default BotTextMessage;
