import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import routes from "./routes";
import Header from "./components/Molecules/Header/Header";
import NavBar from "./components/Molecules/NavBar/NavBar";
import "../node_modules/video-react/dist/video-react.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="belowHeader">
          <NavBar />
          <div className="rightNav">
            <div className="mainbody">{routes}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
