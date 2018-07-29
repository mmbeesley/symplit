import React from "react";
import "./AdminButton.css";

export default function AdminButton(props) {
  const { onClick, children, color } = props;
  return (
    <button className={`adminbutton${color}`} onClick={onClick}>
      {children}
    </button>
  );
}
