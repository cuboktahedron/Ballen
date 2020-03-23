import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "stores/store";
import App from "./components/app";

ReactDOM.render(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Provider store={store as any}>
    <App />
  </Provider>,
  document.getElementById("contents")
);
