/** NPM Modules **/
import React, { Component } from "react";

/** Import CSS **/
import "./reset.css";
import "./App.css";
import "../node_modules/video-react/dist/video-react.css";

/** Import Helpers **/
import routes from "./routes";

/** Import Components **/
import Header from "./components/Molecules/Header/Header";
import NavBar from "./components/Molecules/NavBar/NavBar";

/** Exported Component **/
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
