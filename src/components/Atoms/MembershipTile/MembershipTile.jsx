/** NPM Modules **/
import React from "react";

/** Imported Components **/
import AdminButton from "../AdminButton/AdminButton";

/** Exported Component **/
export default function MembershipTile(props) {
  const { membership, user, openModal } = props;
  const {
    membership_desc,
    membership_id,
    membership_price,
    membership_period,
    membership_title
  } = membership;

  let months = `per ${membership_period} months`;

  if (membership_period === null || membership_period === "") {
    months = "lifetime";
  }
  if (membership_period === 1) {
    months = "per month";
  }

  return (
    <div className="membershiptile">
      <h2 className="membershiptitle">{membership_title}</h2>
      <div className="membershipdesc">{membership_desc}</div>
      <div className="adminbuttoncontainer">
        {user.is_admin ? (
          <AdminButton
            onClick={() => openModal("edit", membership_id)}
            color="blue"
          >
            Edit
          </AdminButton>
        ) : null}
        {user.is_admin ? (
          <AdminButton
            onClick={() => openModal("delete", membership_id)}
            color="blue"
          >
            Delete
          </AdminButton>
        ) : null}
      </div>
      <div className="membershipdetails">
        <p>${membership_price}</p>
        <div className="membershipperiod">{months}</div>
        <button
          className="membershipbutton"
          onClick={() => openModal("payment", undefined, membership)}
        >
          Select
        </button>
      </div>
    </div>
  );
}
