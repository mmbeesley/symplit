/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import ImageField from "../Atoms/ImageField/ImageField";
import CheckBoxField from "../Atoms/CheckBoxField/CheckBoxField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

export default function BookModal(props) {
  const {
    active,
    closeModal,
    onChange,
    bookTitle,
    bookSubTitle,
    bookImage,
    bookSubject,
    bookAuthor,
    memRequired,
    memIds,
    bookVisible,
    submit,
    handleImage
  } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Book Title"
        value={bookTitle}
        onChange={e => onChange("bookTitle", e.target.value)}
      />
      <TextField
        placeholder="Book Subtitle"
        value={bookSubTitle}
        onChange={e => onChange("bookSubTitle", e.target.value)}
      />
      <ImageField handleImage={handleImage} bookImage={bookImage} />
      <TextField
        placeholder="Book Subject"
        value={bookSubject}
        onChange={e => onChange("bookSubject", e.target.value)}
      />
      <TextField
        placeholder="Book Author(s)"
        value={bookAuthor}
        onChange={e => onChange("bookAuthor", e.target.value)}
      />
      <CheckBoxField
        title="Is Membership Required"
        checked={memRequired}
        onChange={e => onChange("memRequired", e.target.checked)}
      />
      <TextField
        placeholder="Membership IDs"
        value={memIds}
        onChange={e => onChange("memIds", e.target.value)}
      />
      <CheckBoxField
        title="Is this book visible yet"
        checked={bookVisible}
        onChange={e => onChange("bookVisible", e.target.checked)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
