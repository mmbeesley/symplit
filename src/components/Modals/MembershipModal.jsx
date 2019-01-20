/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import CheckBoxField from "../Atoms/CheckBoxField/CheckBoxField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

export default function MembershipModal(props) {
  const {
    active,
    closeModal,
    onChange,
    membership_title,
    membership_desc,
    membership_price,
    membership_recurring,
    membership_period,
    submit
  } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Membership Title"
        value={membership_title}
        onChange={e => onChange("membership_title", e.target.value)}
      />
      <TextField
        placeholder="Membership Description"
        value={membership_desc}
        onChange={e => onChange("membership_desc", e.target.value)}
      />
      <TextField
        placeholder="Membership Price"
        value={membership_price}
        onChange={e => onChange("membership_price", e.target.value)}
      />
      <CheckBoxField
        title="Is this Recurring?"
        checked={membership_recurring}
        onChange={e => onChange("membership_recurring", e.target.checked)}
      />
      <TextField
        placeholder="Membership Period"
        value={membership_period}
        onChange={e => onChange("membership_period", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
