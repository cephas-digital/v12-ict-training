import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Router";
import "./App.css";

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
