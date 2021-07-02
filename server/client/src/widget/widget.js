import React from "react";
import "./widget.css";

const Widget = ({ toggle, image }) => {
  const handleClick = (e) => {
    toggle();
  };

  return (
    <div className='widget' onClick={handleClick}>
      <img className='widget-icon' src={image} alt='logo' />
    </div>
  );
};

export default Widget;
