/** NPM Modules */
import React from "react";

/** Import Components */
import Modals from "./Modals";

/** Exported Component */
export default function FailureModal(props) {
  const { active, closeModal } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <div>
        It appears that there was an error with your payment, please try again
        or with a different card. If this problem persists, please{" "}
        <a href="mailto:support@symplit.com">Contact Us</a>. Thank you for your
        patience.
      </div>{" "}
    </Modals>
  );
}
