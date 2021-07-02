import React from "react";

const BotHeader = ({ image, title, description, toggle }) => {
  const handleClick = (e) => {
    console.log("clicking event");

    toggle();
  };

  return (
    <div className='chatbot-header'>
      <div className='chatbot-banner'>
        <img className='bot-icon' src={image} alt='logo' />
        <div className='bot-branding'>
          <div className='bot-title'>{title}</div>
          <div className='bot-description'>{description}</div>
        </div>
      </div>
      <div className='bot-minimize' onClick={handleClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='#ffffff9f'
          height='20'
          viewBox='0 0 24 24'
          width='20'
        >
          <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
          <path d='M0 0h24v24H0z' fill='none'></path>
        </svg>
      </div>
    </div>
  );
};
export default BotHeader;
