import React from "react";

export default function CloseModalButton(props) {
  const { closeModal } = props;
  return (
    <button className="closebutton" onClick={closeModal}>
      X
    </button>
  );
}
