import React from "react";

const BotHeader = ({ image, title, description }) => {
  return (
    <div className='chatbot-banner'>
      <section className='header-Banner'>
        <div id='chatDetails'>
          <img className='icon' src={image} alt='logo' />

          <div className='title'>{title}</div>
          <div className='sub-title'>{description}</div>
        </div>
      </section>
    </div>
  );
};
export default BotHeader;
