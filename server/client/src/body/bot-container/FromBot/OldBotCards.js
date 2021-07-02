import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { addMessages } from "../../../actions/messages";
import "./bot-messages-type-style/cards.css";
import { MDBBtn } from "mdb-react-ui-kit";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

//material - ui

import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

const useStyles = makeStyles({
  root: {
    // maxWidth: 400,
    // height:"10px"
    textAlign: "center",
    alignItems: "center",
    background: "#fff",
    alignSelf: "center",
    justifyContent: "center",
  },
});

const OldBotCards = ({ cards, hide, image }) => {
  const classes = useStyles();
  const [cardIndex, setCardIndex] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (cards.length > 1) {
      setShow(false);
    }
  }, [cards]);
  console.log(show, "CARDS LENGTH");
  const handlePrev = () => {
    cardIndex === 0
      ? setCardIndex(cards.length - 1)
      : setCardIndex(Number(cardIndex) - 1);
  };

  const handleNext = () => {
    console.log("next");

    cardIndex === cards.length - 1
      ? setCardIndex(0)
      : setCardIndex(Number(cardIndex) + 1);
  };

  return (
    <div className='from-bot'>
      <div className='bot-icon-messages'>
        {!hide && <img className='message-icon' src={image} alt='logo' />}
      </div>
      <div className='cards'>
        {/* {cards.map((card, index) => ( */}
        <div className='carousel'>
          <div className='carousel__item carousel__item--visible'>
            <img src={cards[cardIndex].image} alt='cardimage' />
            {!show && (
              <div className='cards-stepper'>
                <MobileStepper
                  variant='dots'
                  steps={cards.length}
                  position='static'
                  activeStep={cardIndex}
                  className={classes.root}
                />
              </div>
            )}
            <div className='title'>
              <h6>{cards[cardIndex].title}</h6>
              <p>{cards[cardIndex].description}</p>
              <div className='card-buttons'>
                {cards[cardIndex].actions &&
                  cards[cardIndex].actions.map((action, key) => (
                    <MDBBtn color='dark'>{action.title}</MDBBtn>
                  ))}
              </div>
            </div>
          </div>

          {!show && (
            <div className='carousel__actions'>
              <button
                id='carousel__button--prev'
                aria-label='Previous slide'
                onClick={handlePrev}
              >
                <FaAngleLeft />{" "}
              </button>
              <button
                id='carousel__button--next'
                aria-label='Next slide'
                onClick={handleNext}
              >
                {" "}
                <FaAngleRight />{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OldBotCards;
