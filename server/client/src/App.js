import "./App.css";
import React, { useState, useEffect } from "react";
import Widget from "./widget/widget";
import Body from "./body/Body";
import { Provider } from "react-redux";
import store from "./store";
import Socket from "./socket";
// import Analytics from "./Analytics";
// import { Socket } from "socket.io-client";
const App = () => {
  const [open, setOpen] = useState(false);

  const [icon, setIcon] = useState(
    "https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif"
  );
  const toggleWidgetHandler = () => {
    if (open) {
      setOpen(false);
      setIcon("https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif");
    } else {
      setOpen(true);
      setIcon("https://static.thenounproject.com/png/57781-200.png");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    console.log("ATTACHING YM");
    script.src = "https://app.yellowmessenger.com/api/chat/demo/x1612163880209";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <Provider store={store}>
      {/* <Analytics/>   */}

      <div className='bot'>
        <Socket />
        <ymfile />
        <Widget toggle={toggleWidgetHandler} image={icon} />
        {open && <Body />}
      </div>
    </Provider>
  );
};

export default App;
