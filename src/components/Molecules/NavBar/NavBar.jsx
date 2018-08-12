/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { connect } from "react-redux";
import { getUserInfo } from "../../../ducks";

/** Imported Components **/
import NavBarLink from "../../Atoms/NavBarLink/NavBarLink";
import AccountLink from "../../Atoms/AccountLink/AccountLink";

/** Imported Assets **/
import book from "../../../images/icon-book.png";
import about from "../../../images/icon-symplit.png";

/** Exported Component **/
class NavBar extends Component {
  componentDidMount() {
    const { getUserInfo } = this.props;

    getUserInfo();
  }

  render() {
    const { user, path } = this.props;
    return (
      <div className="navcontainer">
        <NavBarLink path="/books" asset={book} alt="Find Your Book" />
        <NavBarLink path="/about" asset={about} alt="About" />
        {user && !user.user_id ? (
          <AccountLink asset={about} redirect={path} />
        ) : (
          <NavBarLink path="/account" asset={about} alt="Account" />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    path: state.app.path
  };
}

export default connect(
  mapStateToProps,
  { getUserInfo }
)(NavBar);
