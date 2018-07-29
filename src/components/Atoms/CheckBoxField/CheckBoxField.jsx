import React from "react";

export default function CheckBoxField(props) {
  const { title, checked, onChange } = props;
  return (
    <div className="checkboxfield">
      {title}?{" "}
      <input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </div>
  );
}
