/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import ImageField from "../Atoms/ImageField/ImageField";
import CheckBoxField from "../Atoms/CheckBoxField/CheckBoxField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

export default function PraciceModal(props) {
  const {
    active,
    closeModal,
    onChange,
    handleImage,
    submit,
    problemTitle,
    problemImage,
    problemSolution,
    memRequired,
    memIds
  } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Problem Title"
        value={problemTitle}
        onChange={e => onChange("problemTitle", e.target.value)}
      />
      <ImageField handleImage={handleImage} book_image={problemImage} />
      <TextField
        placeholder="Problem Solution"
        value={problemSolution}
        onChange={e => onChange("problemSolution", e.target.value)}
      />
      <CheckBoxField
        title="Membership Required?"
        checked={memRequired}
        onChange={e => onChange("memRequired", e.target.checked)}
      />
      <TextField
        placeholder="Membership IDs"
        value={memIds}
        onChange={e => onChange("memIds", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
