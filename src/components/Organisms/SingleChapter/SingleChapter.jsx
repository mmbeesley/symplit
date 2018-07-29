/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { getPath, getUserInfo } from "../";
import { connect } from "react-redux";

/** Imported Components **/
import BookCrumb from "../../Atoms/BookCrumb/BookCrumb";
import ChapterDetailNav from "../../Molecules/ChapterDetailNav/ChapterDetailNav";
import Footer from "../../Molecules/Footer/Footer";
import ChapterSection from "../../Molecules/ChapterSection/ChapterSection";

/** Exported Component **/
class SingleChapter extends Component {
  /** LifeCycle Methods */
  componentDidMount() {
    const { getPath, location, getUserInfo } = this.props;

    getUserInfo();
    getPath(location.pathname);
  }

  /** Render Methods **/
  renderSection(e, i) {
    return <ChapterSection />;
  }

  render() {
    return (
      <div className="singlechapterbody">
        <div className="booknavcontainer">
          <BookCrumb />
          <ChapterDetailNav />
        </div>
        <div className="singlechaptercontent">
          {sections && sections.length
            ? sections.map((e, i) => {
                return this.renderSection(e, i);
              })
            : null}
          <Footer />
        </div>
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
  { getPath, getUserInfo }
)(SingleChapter);
