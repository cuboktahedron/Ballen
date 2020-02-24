import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";
import { store } from "../store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Provider store={store as any}>
    <App />
  </Provider>,
  document.getElementById("contents")
);
