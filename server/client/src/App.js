import "./App.css";
import React, { Fragment, useState } from "react";
import Widget from "./widget/widget";
import Body from "./body/Body";
import { Provider } from "react-redux";
import store from "./store";
import Socket from "./socket";
// import Analytics from "./Analytics";
// import { Socket } from "socket.io-client";

const App = () => {
  const [open, setOpen] = useState(false);

  const toggleWidgetHandler = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Provider store={store}>
      {/* <Analytics/>   */}
      <Fragment>
        <Socket />
        <Widget toggle={toggleWidgetHandler} />
        {open && <Body />}
      </Fragment>
    </Provider>
  );
};

export default App;
