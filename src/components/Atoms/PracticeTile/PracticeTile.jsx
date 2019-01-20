/** NPM Modules **/
import React from "react";
import { Link } from "react-router-dom";

/** Exported Component **/
export default function PracticeTile(props) {
  const { problems, bookId, completedProblems, chapter, section } = props;

  const checkCompleted = () => {
    let completedArray = [];
    if (problems && completedProblems.length) {
      problems.forEach(problem =>
        completedProblems.forEach(completed => {
          if (
            problem.problem_id === completed.problem_id &&
            completed.section_id === problem.section_id
          ) {
            completedArray.push(problem);
          }
        })
      );
    }

    return completedArray;
  };

  const completed = checkCompleted();

  let tileClass =
    completed.length === problems.length ? "practicedone" : "practicetile";

  return (
    <div className={tileClass} key={problems.section_title}>
      <Link to={`/practice/${bookId}/${chapter}/${section}`}>
        <div className="practicetilehead">
          {chapter}.{section}
        </div>
        <div className="practicetilecomplete">
          <div className="practicetilecompletenumber">
            {completed.length}/{problems.length}
          </div>
          <div>Completed</div>
        </div>
      </Link>
    </div>
  );
}
