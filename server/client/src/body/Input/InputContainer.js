import React, { useState, useEffect, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
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

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [messages]);

  const userInputChange = (event) => {
    setText(event.target.value);
  };
  const sendInputHandler = (event) => {
    event.preventDefault();
    if (text) {
      addMessages(text);
      userMessage(text);
      botTypingMessageAction();
      console.log("USER_TEXT - ", text);
      setText("");
    }
  };

  return (
    <section className='chat-input'>
      <div className='send-input'>
        <div className='send-input-form'>
          <form action='#' className='typing-area'>
            <input
              ref={inputRef}
              type='text'
              value={text}
              placeholder='Type a message here...'
              onChange={userInputChange}
              // autofocus="true"
            />
            <div onClick={sendInputHandler}>
              <button>
                <FaTelegramPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
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
