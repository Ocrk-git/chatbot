import React from "react";
import {FaHome } from "react-icons/fa";

const PoweredBy = () => {
  return (
    <div className="powerd-by">
      <p>
        {/* <span>Black</span> Messenger */}
        <a href="http://www.majyori.com" target="_blank" rel="noreferrer">
          OCRK
        </a>
      </p>
      <button className="home-button">
        <FaHome />
      </button>
    </div>
  );
};

export default PoweredBy;
