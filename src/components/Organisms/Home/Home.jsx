/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { getPath } from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
import Testimonials from "../../Molecules/Testimonials/Testimonials";
import BookGrid from "../../Molecules/BookGrid/BookGrid";
import GetStartedButton from "../../Atoms/GetStartedButton/GetStartedButton";
import Footer from "../../Molecules/Footer/Footer";

/** Exported Component **/
class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  /** Lifecycle Methods **/
  componentDidMount() {
    const { getPath, location } = this.props;
    getPath(location.pathname);
  }

  /** Render Methods **/
  render() {
    return (
      <div className="homebody">
        <div className="homesplash">
          <div className="hometitle">Struggling in Math?</div>
          <div className="homesubtitle">
            Video Walkthroughs of YOUR Textbook
          </div>
          <GetStartedButton color="blue" />
        </div>
        <Testimonials />
        <div className="homemissioncontainer">
          <div>WE FULLY BELIEVE THAT</div>
          <div className="homemissionaccent"> EVERY STUDENT CAN SUCCEED</div>
          <div> IN MATH; THEY JUST NEED THE RIGHT TEACHER.</div>
        </div>
        <div className="howcontainer">
          <div className="howimage" />
          <div className="howbody">
            <h1>How We Help You</h1>
            <ul>
              <li>Content organized by the sections in your textbook</li>
              <li>Numerous example videos for each concept</li>
              <li>
                Downloadable PDFs with unique tips and tricks for tackling the
                harder concepts
              </li>
            </ul>
            <GetStartedButton color="white" />
          </div>
        </div>
        <BookGrid limiter={3} />
        <GetStartedButton color="blue" />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {
    getPath
  }
)(Home);
