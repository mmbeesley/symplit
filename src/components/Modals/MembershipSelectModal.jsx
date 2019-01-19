/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";

export default function MembershipSelectModal(props) {
  const { active, closeModal, memberships, membershipAvailability } = props;

  let selectMap = memberships.length
    ? memberships.map((e, i) => {
        return (
          <div key={i} className="selectfield">
            <div>{e.membership_title}</div>
            <div>{e.membership_price}</div>
            <div>{e.membership_period}</div>
            <div>
              <input
                checked={e.available}
                onChange={() =>
                  membershipAvailability(e.membership_id, e.available)
                }
                type="checkbox"
              />
            </div>
          </div>
        );
      })
    : null;

  return (
    <Modals active={active} closeModal={closeModal}>
      <div className="selectfield">
        <div>TITLE</div>
        <div>PRICE</div>
        <div>PERIOD</div>
        <div>AVAILABLE?</div>
      </div>
      {selectMap}
    </Modals>
  );
}
