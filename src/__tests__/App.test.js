import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "../app/App";

import configureStore from "../store/configure-store";

const initialState = {};

const store = configureStore(initialState);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
