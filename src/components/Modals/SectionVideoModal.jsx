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
    section_video_title,
    section_video_text,
    openModal,
    video_title,
    membership_required_video,
    membership_ids,
    handleHandout,
    section_video_handout,
    submit
  } = props;

  return (
    <Modals active={active} closeModal={closeModal}>
      <TextField
        placeholder="Section Video Title"
        value={section_video_title}
        onChange={e => onChange("section_video_title", e.target.value)}
      />
      <TextField
        placeholder="Section Video Text"
        value={section_video_text}
        onChange={e => onChange("section_video_text", e.target.value)}
      />
      <VideoField openModal={openModal} video_title={video_title} />
      <CheckBoxField
        title="Is Membership Required"
        checked={membership_required_video}
        onChange={e => onChange("membership_required_video", e.target.checked)}
      />
      <TextField
        placeholder="Section Video Membership IDs"
        value={membership_ids}
        onChange={e => onChange("membership_ids", e.target.value)}
      />
      <HandoutField
        handleHandout={handleHandout}
        sectionHandout={section_video_handout}
      />
      <SubmitButton submit={submit} />
    </Modals>
  );
}
