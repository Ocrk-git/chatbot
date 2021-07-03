import "./App.css";
import React, { useState, Fragment } from "react";
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
    "https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png"
  );
  const toggleWidgetHandler = () => {
    if (open) {
      setOpen(false);
      setIcon("https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png");
    } else {
      setOpen(true);
      setIcon("https://cdn.yellowmessenger.com/6z2kqCtJ8pOr1611815647456.png");
    }
  };

  return (
    <Fragment>
      <Provider store={store}>
        {/* <Analytics/>   */}
        {/* <div className='bot'> */}
        <Socket />
        {!open && <Widget toggle={toggleWidgetHandler} image={icon} />}
        {open && <Body toggle={toggleWidgetHandler} />}
        {/* </div> */}
      </Provider>
    </Fragment>
  );
};

export default App;
