import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CountContextProvider } from "./component/context/count-context";

ReactDOM.render(
  <CountContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CountContextProvider>,
  document.getElementById("root")
);
