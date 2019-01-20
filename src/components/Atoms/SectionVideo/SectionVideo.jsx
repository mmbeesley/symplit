/** NPM Modules **/
import React from "react";
import ReactPlayer from "react-player";

/** Imported Components **/
import AdminButton from "../../Atoms/AdminButton/AdminButton";

/** Exported Component **/
export default function SectionVideo(props) {
  const { video, user, openModal } = props;
  const {
    section_video_title,
    section_video_id,
    video_url,
    section_video_text
  } = video;
  const style = {
    border: "solid",
    borderWidth: "2px",
    borderColor: "var(--logo-gray)",
    padding: "2px",
    borderRadius: "2px"
  };

  return (
    <a name={section_video_title}>
      <div className="videotile">
        <div className="videotitle">{section_video_title}</div>
        {!user.is_admin ? null : (
          <AdminButton
            color="blue"
            onClick={() => openModal("edit", section_video_id)}
          >
            Edit Video
          </AdminButton>
        )}
        {!user.is_admin ? null : (
          <AdminButton
            color="blue"
            onClick={() => openModal("delete", section_video_id)}
          >
            Delete Video
          </AdminButton>
        )}
        <div className="videobody">
          <ReactPlayer url={video_url} style={style} className="reactplayer" />
          <div className="videodesc">
            <div>{section_video_text}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
