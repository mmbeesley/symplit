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
    membershipTitle,
    membershipDescription,
    membershipPrice,
    membershipRecurring,
    membershipPeriod,
    submit
  } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Membership Title"
        value={membershipTitle}
        onChange={e => onChange("membershipTitle", e.target.value)}
      />
      <TextField
        placeholder="Membership Description"
        value={membershipDescription}
        onChange={e => onChange("membershipDescription", e.target.value)}
      />
      <TextField
        placeholder="Membership Price"
        value={membershipPrice}
        onChange={e => onChange("membershipPrice", e.target.value)}
      />
      <CheckBoxField
        title="Is this Recurring?"
        checked={membershipRecurring}
        onChange={e => onChange("membershipRecurring", e.target.checked)}
      />
      <TextField
        placeholder="Membership Period"
        value={membershipPeriod}
        onChange={e => onChange("membershipPeriod", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
