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
    sectionTitle,
    sectionNumber,
    sectionSummary,
    memRequired,
    memIds,
    problemIds,
    handleHandout,
    sectionHandout,
    submit
  } = props;

  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Section Title"
        value={sectionTitle}
        onChange={e => onChange("sectionTitle", e.target.value)}
      />
      <TextField
        placeholder="Section Number"
        value={sectionNumber}
        onChange={e => onChange("sectionNumber", e.target.value)}
      />
      <TextField
        placeholder="Section Summary"
        value={sectionSummary}
        onChange={e => onChange("sectionSummary", e.target.value)}
      />
      <CheckBoxField
        title="Is Membership Required"
        checked={memRequired}
        onChange={e => onChange("memRequired", e.target.checked)}
      />
      <TextField
        placeholder="Section Membership IDs"
        value={memIds}
        onChange={e => onChange("memIds", e.target.value)}
      />
      <TextField
        placeholder="Practice Problem IDs"
        value={problemIds}
        onChange={e => onChange("problemIds", e.target.value)}
      />
      <HandoutField
        handleHandout={handleHandout}
        sectionHandout={sectionHandout}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
