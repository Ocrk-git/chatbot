import React from "react";
import { connect } from "react-redux";
import { homeButton } from "../../actions/userMessageAction";
import "./poweredBy.css";

import { botTypingMessageAction } from "../../actions/botMessageActions";
const PoweredBy = ({ homeButton, botTypingMessageAction }) => {
  const homeClickHandler = () => {
    homeButton();
    botTypingMessageAction();
  };

  return (
    <div className='powerd-by'>
      <div className='branding'>
        {/* <span>Black</span> Messenger */}
        <span>Powered by </span>
        <a href='http://www.majyori.com' target='_blank' rel='noreferrer'>
          OCRK
        </a>
      </div>

      <div className='home-button' onClick={homeClickHandler}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          // height='16'
          viewBox='0 0 24 24'
        >
          <path d='M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z' />
        </svg>
      </div>
    </div>
  );
};

export default connect(null, { homeButton, botTypingMessageAction })(PoweredBy);
