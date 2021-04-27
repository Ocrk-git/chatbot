import React from "react";
import "./body.css";

import BotHeader from "./header/BotHeader";
import "./header/header.css";
import ChatContainer from "./bot-container/ChatContainer";
import InputContainer from "./Input/InputContainer";
import PoweredBy from "./poweredBy/PoweredBy";

const Banner = (props) => {
  return (
    <div className="chatbot">
      {/* chat bot banner header  */}
      <BotHeader
        image='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif'
        title='Amazon'
        description='Work Hard, Have Fun, Make History'
      />

      <ChatContainer image={props.image} />

      {/* sending input  */}

      <InputContainer />

      {/* powerd by  */}
      <PoweredBy />
    </div>
  );
};

export default Banner;
