import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { connect } from "react-redux";
import { addMessages, userMessage } from "../../actions/messages";

const InputContainer = ({ addMessages, userMessage }) => {
  const [text, setText] = useState("");

  const userInputChange = (event) => {
    setText(event.target.value);
  };
  const sendInputHandler = (event) => {
    event.preventDefault();
    if (text) {
      addMessages(text);
      userMessage(text);
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
              type='text'
              value={text}
              placeholder='Type a message here...'
              onChange={userInputChange}
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

export default connect(null, { addMessages, userMessage })(InputContainer);
