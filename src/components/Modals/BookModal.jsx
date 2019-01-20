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
    book_title,
    book_subtitle,
    book_image,
    book_subject,
    author,
    membership_required_book,
    membership_ids_book,
    visible,
    submit,
    handleImage
  } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Book Title"
        value={book_title}
        onChange={e => onChange("book_title", e.target.value)}
      />
      <TextField
        placeholder="Book Subtitle"
        value={book_subtitle}
        onChange={e => onChange("book_subtitle", e.target.value)}
      />
      <ImageField handleImage={handleImage} book_image={book_image} />
      <TextField
        placeholder="Book Subject"
        value={book_subject}
        onChange={e => onChange("book_subject", e.target.value)}
      />
      <TextField
        placeholder="Book Author(s)"
        value={author}
        onChange={e => onChange("author", e.target.value)}
      />
      <CheckBoxField
        title="Is Membership Required"
        checked={membership_required_book}
        onChange={e => onChange("membership_required_book", e.target.checked)}
      />
      <TextField
        placeholder="Membership IDs"
        value={membership_ids_book}
        onChange={e => onChange("membership_ids_book", e.target.value)}
      />
      <CheckBoxField
        title="Is this book visible yet"
        checked={visible}
        onChange={e => onChange("visible", e.target.checked)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
