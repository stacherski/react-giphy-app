import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

let seconds = 0;
const setSeconds = () => {
  seconds++;
  document.getElementById("timer").textContent = seconds;
};
setInterval(setSeconds, 1000);
