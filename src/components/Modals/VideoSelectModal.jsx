/** NPM Modules **/
import React from "react";

/** Import Components **/
import Modals from "./Modals";
import AdminButton from "../Atoms/AdminButton/AdminButton";

export default function VideoSelectModal(props) {
  const { active, closeModal, videos, openModal, selectVideo } = props;

  let videosMap = videos.length
    ? videos.map((e, i) => {
        return (
          <div key={e.video_id}>
            <h1>{e.video_title}</h1>
            <AdminButton
              onClick={() => openModal("videoEdit", e.video_id)}
              color="blue"
            >
              Edit
            </AdminButton>
            <AdminButton
              onClick={() => openModal("videoDelete", e.video_id)}
              color="blue"
            >
              Delete
            </AdminButton>
            <AdminButton onClick={() => selectVideo(e)} color="blue">
              Select
            </AdminButton>
          </div>
        );
      })
    : null;

  return (
    <Modals active={active} closeModal={closeModal}>
      {videosMap}
    </Modals>
  );
}
