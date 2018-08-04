/** NPM Modules **/
import React from "react";
import ReactPlayer from "react-player";

/** Imported Components **/
import AdminButton from "../../Atoms/AdminButton/AdminButton";

/** Exported Component **/
export default function SectionVideo(props) {
  const { video, user, openModal } = props;
  const {
    sectionVideoTitle,
    sectionVideoId,
    videoUrl,
    sectionVideoText
  } = video;
  const style = {
    border: "solid",
    borderWidth: "2px",
    borderColor: "var(--logo-gray)",
    padding: "2px",
    borderRadius: "2px"
  };

  return (
    <a name={sectionVideoTitle}>
      <div className="videotile">
        <div className="videotitle">{sectionVideoTitle}</div>
        {!user.is_admin ? null : (
          <AdminButton
            color="blue"
            onClick={() => openModal("edit", sectionVideoId)}
          >
            Edit Video
          </AdminButton>
        )}
        {!user.is_admin ? null : (
          <AdminButton
            color="blue"
            onClick={() => openModal("delete", sectionVideoId)}
          >
            Delete Video
          </AdminButton>
        )}
        <div className="videobody">
          <ReactPlayer url={videoUrl} style={style} className="reactplayer" />
          <div className="videodesc">
            <div>{sectionVideoText}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
