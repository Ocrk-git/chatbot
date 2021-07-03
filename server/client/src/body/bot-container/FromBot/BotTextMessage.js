import React from "react";
import "./bot-messages-type-style/textMessage.css";

const BotTextMessage = ({ image, message, hide }) => {
  // const [keys, setKeys] = useState([]);

  return (
    <div className='from-bot'>
      <div className='bot-icon-messages'>
        {!hide && <img className='message-icon' src={image} alt='logo' />}
      </div>
      <div className='text-message'>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default BotTextMessage;
