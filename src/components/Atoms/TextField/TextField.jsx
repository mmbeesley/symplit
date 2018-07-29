import React from "react";

export default function TextField(props) {
  const { placeholder, value, onChange } = props;
  return (
    <div className="checkboxfield">
      {placeholder}:{" "}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
