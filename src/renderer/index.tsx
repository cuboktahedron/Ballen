import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "stores/store";
import App from "./components/App";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

ReactDOM.render(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Provider store={store as any}>
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  </Provider>,
  document.getElementById("contents")
);
