import React from "react";
import {FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import {homeButton} from "../../actions/userMessageAction"
import "./poweredBy.css";


const PoweredBy = ({homeButton}) => {

  const homeClickHandler = () =>{
    homeButton()
  }


  return (
    <div className="powerd-by">
      <p>
        {/* <span>Black</span> Messenger */}
        <a href="http://www.majyori.com" target="_blank" rel="noreferrer">
          OCRK
        </a>
      </p>
      <button className="home-button" onClick={homeClickHandler}>
        <FaHome />
      </button>
    </div>
  );
};

export default connect(null, {homeButton})(PoweredBy);
