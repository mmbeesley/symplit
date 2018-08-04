/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

export default function VideoModal(props) {
  const {
    active,
    closeModal,
    onChange,
    vimeoVideoTitle,
    vimeoVideoUrl,
    submit
  } = props;

  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Vimeo Video Title"
        value={vimeoVideoTitle}
        onChange={e => onChange("vimeoVideoTitle", e.target.value)}
      />
      <TextField
        placeholder="Vimeo Video URL"
        value={vimeoVideoUrl}
        onChange={e => onChange("vimeoVideoUrl", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
