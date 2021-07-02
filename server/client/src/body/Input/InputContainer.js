import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addMessages, userMessage } from "../../actions/userMessageAction";
import { botTypingMessageAction } from "../../actions/botMessageActions";

import "./chatInput.css";

const InputContainer = ({
  addMessages,
  userMessage,
  messages,
  botTypingMessageAction,
}) => {
  const [text, setText] = useState("");
  // const [count,setCount]
  const [showButton, setShowButton] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [messages]);

  const userInputChange = (event) => {
    setText(event.target.value);
  };
  useEffect(() => {
    if (text.length > 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [text]);

  const sendInputHandler = (event) => {
    event.preventDefault();
    if (text) {
      addMessages(text);
      userMessage(text);
      botTypingMessageAction();
      // console.log("USER_TEXT - ", text);
      setText("");
    }
  };

  const quickActionsShowHandler = (event) => {
    var show = document.getElementById("quick-actions");
    show.classList.add("quick-actions-show");
  };

  return (
    <div className='bot-footer'>
      <div className='powered-by-in-container'>
        <span>Powered by</span>
        <a href='http://www.majyori.com' target='_blank' rel='noreferrer'>
          OCRK
        </a>
      </div>
      <form className='input-container'>
        <div className='hamburger-menu' onClick={quickActionsShowHandler}>
          <svg
            className='menu-button'
            xmlns='http://www.w3.org/2000/svg'
            width='26'
            height='26'
            viewBox='0 0 26 26'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
          </svg>
        </div>
        <div className='typing-bar'>
          <input
            ref={inputRef}
            type='text'
            value={text}
            placeholder='Send a message ...'
            onChange={userInputChange}
            // autofocus="true"
          />
        </div>
        {showButton && (
          <button className='send-icon' onClick={sendInputHandler}>
            <svg
              aria-label='Send'
              viewBox='0 0 24 24'
              width='19'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M2,21L23,12L2,3V10L10,12L2,14V21Z' />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messageContainer.messages,
});

export default connect(mapStateToProps, {
  addMessages,
  userMessage,
  botTypingMessageAction,
})(InputContainer);
