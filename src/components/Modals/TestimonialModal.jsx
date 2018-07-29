/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

function TestimonialModal(props) {
  const { active, closeModal, onChange, submit, nameInput, bodyInput } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Testimonial Giver Name"
        value={nameInput}
        onChange={e => onChange("nameInput", e.target.value)}
      />
      <TextField
        placeholder="Testimonial Body"
        value={bodyInput}
        onChange={e => onChange("bodyInput", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}

export default TestimonialModal;
