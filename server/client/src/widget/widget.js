import React, { useState } from "react";
import "./widget.css";

const Widget = ({ toggle, image }) => {
  const [bot, setBot] = useState({
    diffX: 0,
    diffY: 0,
    dragging: false,
  });

  const [styles, setStyles] = useState({
    left: "",
  });

  const handleClick = (e) => {
    console.log("clicking event");
    // if (bot.dragging) {
    //   toggle();
    // } else {
    //   toggle();
    // }
    toggle();
  };

  const botDraggingStart = (e) => {
    console.log("bot dragging start");
    setBot({
      dragging: true,
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      // diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
    });
  };
  // const botDragging = (e) => {
  //   if (bot.dragging) {
  //     console.log("dragging when clicked");

  //     var left = e.screenX - bot.diffX;
  //     // var top = e.screenY - bot.diffY;
  //     // console.log(left, top, "Top and Left");
  //     setStyles({
  //       left,
  //       // top,
  //     });
  //   } else {
  //     console.log("dragging outside");
  //   }
  // };

  window.onmousemove = (e) => {
    if (bot.dragging) {
      console.log("mouse moving");

      var left = e.screenX - bot.diffX;
      // var top = e.screenY - bot.diffY;
      // console.log(left, top, "Top and Left");
      setStyles({
        left,
        // top,
      });
    } else {
      // console.log("moving outside");
    }
  };

  window.onmouseup = (e) => {
    console.log("stop mouse dragging");
    setBot({
      dragging: false,
    });
  };
  // const botDraggingStop = (e) => {
  //   console.log("Dragging stop");
  //   setBot({
  //     dragging: false,
  //   });
  // };

  return (
    <div
      className='widget'
      style={styles}
      onMouseDown={botDraggingStart}
      // onMouseMove={botDragging}
      // onMouseUp={botDraggingStop}
      onClick={handleClick}
    >
      <img className='widget-icon' style={styles} src={image} alt='logo' />
    </div>
  );
};

export default Widget;
