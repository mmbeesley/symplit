/** NPM Modules */
import React from "react";

/** Import Components */
import Modals from "./Modals";

/** Exported Component */
export default function SuccessModal(props) {
  const { active, closeModal } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <div>Thank you for your payment. Now go and enjoy the Maths!</div>
    </Modals>
  );
}
