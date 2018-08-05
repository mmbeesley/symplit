import React from "react";

export default function HandoutField(props) {
  const { openModal, videoTitle } = props;
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
      <p>Current Video: {videoTitle}</p>
    </div>
  );
}
