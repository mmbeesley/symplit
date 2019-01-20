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
    video_title,
    video_url,
    submit
  } = props;

  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Vimeo Video Title"
        value={video_title}
        onChange={e => onChange("video_title", e.target.value)}
      />
      <TextField
        placeholder="Vimeo Video URL"
        value={video_url}
        onChange={e => onChange("video_url", e.target.value)}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
