import React from "react";

export default function CloseModalButton(props) {
  const { closeModal } = props;
  return (
    <button className="closemodal" onClick={closeModal}>
      Close
    </button>
  );
}
