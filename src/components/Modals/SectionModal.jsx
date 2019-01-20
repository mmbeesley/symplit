/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import CheckBoxField from "../Atoms/CheckBoxField/CheckBoxField";
import HandoutField from "../Atoms/HandoutField/HandoutField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

export default function SectionModal(props) {
  const {
    active,
    closeModal,
    onChange,
    section_title,
    section_number,
    section_text,
    membership_required_section,
    membership_ids,
    problem_ids,
    handleHandout,
    section_handout,
    submit
  } = props;

  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Section Title"
        value={section_title}
        onChange={e => onChange("section_title", e.target.value)}
      />
      <TextField
        placeholder="Section Number"
        value={section_number}
        onChange={e => onChange("section_number", e.target.value)}
      />
      <TextField
        placeholder="Section Summary"
        value={section_text}
        onChange={e => onChange("section_text", e.target.value)}
      />
      <CheckBoxField
        title="Is Membership Required"
        checked={membership_required_section}
        onChange={e =>
          onChange("membership_required_section", e.target.checked)
        }
      />
      <TextField
        placeholder="Section Membership IDs"
        value={membership_ids}
        onChange={e => onChange("membership_ids", e.target.value)}
      />
      <TextField
        placeholder="Practice Problem IDs"
        value={problem_ids}
        onChange={e => onChange("problem_ids", e.target.value)}
      />
      <HandoutField
        handleHandout={handleHandout}
        section_handout={section_handout}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
