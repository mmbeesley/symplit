/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import TextField from "../Atoms/TextField/TextField";
import CheckBoxField from "../Atoms/CheckBoxField/CheckBoxField";
import VideoField from "../Atoms/VideoField/VideoField";
import HandoutField from "../Atoms/HandoutField/HandoutField";
import SubmitButton from "../Atoms/SubmitButton/SubmitButton";

export default function SectionVideoModal(props) {
  const {
    active,
    closeModal,
    onChange,
    sectionVideoTitle,
    sectionVideoText,
    openModal,
    videoTitle,
    memRequired,
    memIds,
    handleHandout,
    videoHandout,
    submit
  } = props;

  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Section Video Title"
        value={sectionVideoTitle}
        onChange={e => onChange("sectionVideoTitle", e.target.value)}
      />
      <TextField
        placeholder="Section Video Text"
        value={sectionVideoText}
        onChange={e => onChange("sectionVideoText", e.target.value)}
      />
      <VideoField openModal={openModal} videoTitle={videoTitle} />
      <CheckBoxField
        title="Is Membership Required"
        checked={memRequired}
        onChange={e => onChange("memRequired", e.target.checked)}
      />
      <TextField
        placeholder="Section Video Membership IDs"
        value={memIds}
        onChange={e => onChange("memIds", e.target.value)}
      />
      <HandoutField
        handleHandout={handleHandout}
        sectionHandout={videoHandout}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
