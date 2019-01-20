import React from "react";

export default function ImageField(props) {
  const { handleImage, book_image } = props;
  return (
    <div>
      <div className="checkboxfield">
        Upload New Image:{" "}
        <button onClick={handleImage} className="upload-button">
          Add Image
        </button>
      </div>
      <p>Current Image: {book_image}</p>
    </div>
  );
}
