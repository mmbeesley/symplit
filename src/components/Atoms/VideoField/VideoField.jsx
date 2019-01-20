import React from "react";

export default function HandoutField(props) {
  const { openModal, video_title } = props;
  return (
    <div>
      <div className="checkboxfield">
        Add a Video:{" "}
        <button
          onClick={() => openModal("videoSelect")}
          className="submitButton"
        >
          Add
        </button>
      </div>
      <p>Current Video: {video_title}</p>
    </div>
  );
}
