/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { completeProblem, undoCompleteProblem } from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
// import AdminButton from "../../Atoms/AdminButton/AdminButton";
import PracticeCompleteButton from "../../Atoms/PracticeCompleteButton/PracticeCompleteButton";

/** Exported Component **/
class PracticeProblem extends Component {
  completeProblem() {
    const { problem, section, completeProblem } = this.props;
    const body = {
      problemId: problem.problem_id,
      sectionId: section
    };

    completeProblem(body);
  }

  undoCompleteProblem() {
    const { problem, section, undoCompleteProblem } = this.props;

    undoCompleteProblem(problem.problem_id, section);
  }

  render() {
    const { problem, openModal, completed } = this.props;

    let image =
      "http://res.cloudinary.com/symplit/image/upload/" + problem.problem_image;

    let problemClass = completed ? "problemcompleted" : "problemtile";

    return (
      <div className={problemClass}>
        <img src={image} alt={problem.problem_image} />
        <div className="practicebuttoncontainer">
          <button
            onClick={() => openModal("solution", problem.problem_solution)}
          >
            See Solution
          </button>
          <PracticeCompleteButton
            completed={completed}
            problemId={problem.problem_id}
            completeProblem={this.completeProblem.bind(this)}
            undoCompleteProblem={this.undoCompleteProblem.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { completeProblem, undoCompleteProblem }
)(PracticeProblem);
