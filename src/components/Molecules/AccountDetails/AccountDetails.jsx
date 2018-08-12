/** NPM Modules **/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

/** Redux **/
import { connect } from "react-redux";

/** Exported Components **/
class AccountDetails extends Component {
  /** Render Methods **/
  render() {
    const { user, membership } = this.props;
    const {
      membership_title,
      membership_period,
      membership_recurring,
      membership_price
    } = membership;

    let endDate = user.membership_start_date
      ? moment(user.membership_start_date)
          .add(membership_period, "months")
          .format("LL")
      : null;

    return (
      <div className="accountmembership">
        <h2>Hello {user.user_name}!</h2>
        <h3>Your Membership Details</h3>
        <div>
          <div className="checkboxfield">
            Membership: {!user.membership_id ? "Free Trial" : membership_title}
          </div>
          {!user.membership_id ? (
            <div className="homebooksbutton splashbutton">
              <Link to="/memberships">Sign Up</Link>
            </div>
          ) : (
            <div>
              <div className="checkboxfield">
                Membership Length:{" "}
                {membership_period ? `${membership_period} months` : "Lifetime"}
              </div>
              <div className="checkboxfield">
                Membership Cost:{" "}
                {membership_recurring
                  ? `$${membership_price} per ${
                      membership_period
                        ? `${membership_period} months`
                        : "Lifetime"
                    }`
                  : `$${membership_price} One Time`}
              </div>
              <div className="checkboxfield">
                {membership_recurring
                  ? `Next Billing Date: ${endDate}`
                  : `Membership End Date: ${endDate}`}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    membership: state.membership,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {}
)(AccountDetails);
