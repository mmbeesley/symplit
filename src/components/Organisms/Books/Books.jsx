/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { getUserInfo, getPath } from "../../../ducks";
import { connect } from "react-redux";

/** Import Components **/
import SearchForm from "../../Molecules/SearchForm/SearchForm";
import BookGrid from "../../Molecules/BookGrid/BookGrid";
import Footer from "../../Molecules/Footer/Footer";

/** Exported Component **/
class Books extends Component {
  /** LifeCycle Methods **/
  componentDidMount() {
    const { getPath, location, getUserInfo } = this.props;
    getPath(location.pathname);
    getUserInfo();
  }

  /** Render Methods **/
  render() {
    return (
      <div className="booksbody">
        <SearchForm />
        <BookGrid />
        <h3 className="bookrequest">
          Not seeing your textbook? Request yours at{" "}
          <a href="mailto:support@symplit.com" className="supportlink">
            support@symplit.com
          </a>
        </h3>
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
  { getUserInfo, getPath }
)(Books);
