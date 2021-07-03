import React from "react";
import "./bot-messages-type-style/video.css";
const BotVideo = ({ hide, video, image }) => {
  return (
    <div className='from-bot'>
      <div className='bot-icon-messages'>
        {!hide && <img className='message-icon' src={image} alt='logo' />}
      </div>
      <div className='video'>
        <video width='270' controls autoPlay muted>
          <source src={video} type='video/mp4' />
        </video>
      </div>
    </div>
  );
};

export default BotVideo;
