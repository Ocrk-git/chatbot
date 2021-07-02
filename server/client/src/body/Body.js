import React from "react";
import "./body.css";

import "./Input/quickActions.css";
import BotHeader from "./header/BotHeader";
import "./header/header.css";
import ChatContainer from "./bot-container/ChatContainer";
import InputContainer from "./Input/InputContainer";
import PoweredBy from "./poweredBy/PoweredBy";
import QuickActions from "./Input/QuickActions";
const Banner = ({ toggle, image }) => {
  return (
    // <div className="chatbot">
    // </div>
    <div id='chatbot' className='chatbot'>
      {/* chat bot banner header  */}
      <BotHeader
        image='https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png'
        title='Amazon'
        description='Work Hard, Have Fun, Make History'
        toggle={toggle}
      />

      <ChatContainer image={image} />

      {/* User Input Bar */}

      <InputContainer />
      {/* powerd by  */}
      {/* <PoweredBy /> */}
      <QuickActions />
    </div>
  );
};

export default Banner;
