import React from "react";
import "./bot-messages-type-style/textMessage.css";

const BotTextMessage = (props) => {
  // const [keys, setKeys] = useState([]);
  var image = <img className='message-icon' src={props.image} alt='logo' />;
  var noImage = <div className='hide-message-icon' />;

  return (
    <div className='from-bot'>
      {props.hide ? noImage : image}
      <div className='text-message'>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default BotTextMessage;
