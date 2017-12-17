import React from "react";
import ReactDOM from "react-dom";
import Home from "./containers/home";

const App = () => {
  return (
    <Home />
  );
};

ReactDOM.render(<App />, document.getElementById("app"));