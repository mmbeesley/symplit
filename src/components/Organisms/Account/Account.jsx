/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { getPath, getUserMembership } from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
import AccountDetails from "../../Molecules/AccountDetails/AccountDetails";
import AccountLinks from "../../Molecules/AccountLinks/AccountLinks";
import SavedBooks from "../../Molecules/SavedBooks/SavedBooks";
import Footer from "../../Molecules/Footer/Footer";

/** Exported Component **/
class Account extends Component {
  /** LifeCycle Methods **/
  componentDidMount() {
    const { getPath, location, getUserMembership } = this.props;
    getPath(location.pathname);
    getUserMembership();
  }

  /** Render Methods **/
  render() {
    return (
      <div>
        <div className="accountmain">
          <div className="accountleft">
            <AccountDetails />
            <AccountLinks />
          </div>
          <div className="accountright">
            <SavedBooks />
          </div>
        </div>
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
  { getPath, getUserMembership }
)(Account);
