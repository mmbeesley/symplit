/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import CheckBoxField from "../Atoms/CheckBoxField/CheckBoxField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

export default function ChapterModal(props) {
  const {
    active,
    closeModal,
    onChange,
    chapter_title,
    book_chapter,
    membership_required_chapter,
    membership_ids,
    submit
  } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Chapter Title"
        value={chapter_title}
        onChange={e => onChange("chapter_title", e.target.value)}
      />
      <TextField
        placeholder="Chapter Number"
        value={book_chapter}
        onChange={e => onChange("book_chapter", e.target.value)}
      />
      <CheckBoxField
        title="Is Membership Required"
        checked={membership_required_chapter}
        onChange={e =>
          onChange("membership_required_chapter", e.target.checked)
        }
      />
      <TextField
        placeholder="Chapter Membership IDs"
        value={membership_ids}
        onChange={e => onChange("membership_ids", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
