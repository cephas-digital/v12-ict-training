import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Router";
import "./App.css";
import { SetDefaultHeaders } from "./data/Config";
import { WhatsappButton } from "./components/v-twelve/whatsapp-button";

SetDefaultHeaders();

function App() {
  return (
    <div className="App">
      <Router>
        <Routers />
      </Router>
      <WhatsappButton phoneNumber="+447733714715" />
    </div>
  );
}

export default App;
