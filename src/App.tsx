import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Router";
import "./App.css";
import { SetDefaultHeaders } from "./data/Config";

SetDefaultHeaders();

function App() {
  return (
    <div className="App">
      <Router>
        <Routers />
      </Router>
    </div>
  );
}

export default App;
