import React from "react";

export default function ImageField(props) {
  const { handleImage, bookImage } = props;
  return (
    <div>
      <div className="checkboxfield">
        Upload New Image:{" "}
        <button onClick={handleImage} className="upload-button">
          Add Image
        </button>
      </div>
      <p>Current Image: {bookImage}</p>
    </div>
  );
}
