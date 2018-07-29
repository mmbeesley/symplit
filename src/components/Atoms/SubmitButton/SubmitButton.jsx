import React from "react";

export default function SubmitButton(props) {
  const { submit } = props;
  return (
    <button className="submitButton" onClick={submit}>
      Submit
    </button>
  );
}
