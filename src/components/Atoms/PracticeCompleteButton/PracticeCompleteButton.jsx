/** NPM Modules **/
import React from "react";

/** Exported Component **/
export default function PracticeCompleteButton(props) {
  const { completed, completeProblem, undoCompleteProblem, problemId } = props;

  let submit = completed
    ? () => undoCompleteProblem(problemId)
    : () => completeProblem(problemId);

  return (
    <button className="completebutton" onClick={submit}>
      {completed ? "UnMark as Complete" : "Mark as Complete"}
    </button>
  );
}
