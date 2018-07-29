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
    chapterTitle,
    bookChapter,
    memRequired,
    memIds,
    submit
  } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Chapter Title"
        value={chapterTitle}
        onChange={e => onChange("chapterTitle", e.target.value)}
      />
      <TextField
        placeholder="Chapter Number"
        value={bookChapter}
        onChange={e => onChange("bookChapter", e.target.value)}
      />
      <CheckBoxField
        title="Is Membership Required"
        checked={memRequired}
        onChange={e => onChange("memRequired", e.target.checked)}
      />
      <TextField
        placeholder="Chapter Membership IDs"
        value={memIds}
        onChange={e => onChange("memIds", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
