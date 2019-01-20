/** NPM Modules */
import React from "react";

/** Import Components */
import Modals from "./Modals";

/** Exported Component */
export default function ProgressModal(props) {
  const { active, closeModal } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <div>Please wait while your order is processed...</div>
    </Modals>
  );
}
