/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

function DeleteModal(props) {
  const { active, closeModal, submit } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      Are you sure you want to delete this?
      <SubmitButton submit={submit} />
    </Modals>
  );
}

export default DeleteModal;
