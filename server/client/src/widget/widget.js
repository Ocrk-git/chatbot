import React from "react";
import "./widget.css";

const Widget = ({toggle}) => {
  return (
    <div className="widget" onClick = {toggle}>
      <img
        className="widget-icon"
        src='https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif' alt="logo"
      />
    </div>
  );
};

export default Widget;
