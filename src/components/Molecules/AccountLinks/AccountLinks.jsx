/** NPM Modules **/
import React, { Component } from "react";
import { Link } from "react-router-dom";

/** Exported Components **/
class AccountLinks extends Component {
  /** Render Methods **/
  render() {
    return (
      <div className="accountlinks">
        <div>
          <Link to="/memberships">Renew/Change Membership</Link>
        </div>
        <div>
          <Link to="/">Update Payment Details</Link>
        </div>
        <div>
          <Link to="/">Cancel Membership</Link>
        </div>
        <div>
          <Link to="/">Apply a Discount Code</Link>
        </div>
        <div>
          <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
        </div>
      </div>
    );
  }
}

export default AccountLinks;
