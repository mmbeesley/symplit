/** NPM Modules **/
import React from "react";
import ReactPlayer from "react-player";

/** Import Components **/
import Modals from "./Modals";

export default function SolutionModal(props) {
  const { videoUrl, active, closeModal } = props;

  const style = {
    border: "solid",
    borderWidth: "2px",
    borderColor: "var(--logo-gray)",
    padding: "2px",
    borderRadius: "2px"
  };

  return (
    <Modals active={active} closeModal={() => closeModal("solution")}>
      <ReactPlayer url={videoUrl} style={style} />
    </Modals>
  );
}
