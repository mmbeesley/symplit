import React from "react";

export default function HandoutField(props) {
  const { handleHandout, sectionHandout } = props;
  return (
    <div>
      <div className="checkboxfield">
        Upload Section Handout:{" "}
        <button onClick={handleHandout} className="upload-button">
          Add PDF
        </button>
      </div>
      <p>Current PDF: {sectionHandout}</p>
    </div>
  );
}
