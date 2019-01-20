/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getProblems,
  getCompletedProblems,
  getBookSections
} from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
import PracticeTile from "../../Atoms/PracticeTile/PracticeTile";

/** Exported Component **/
class PracticeContainer extends Component {
  /**LifeCycle Methods **/
  componentDidMount() {
    const {
      getProblems,
      getCompletedProblems,
      id,
      getBookSections
    } = this.props;
    getProblems(id);
    getCompletedProblems();
    getBookSections(id);
  }

  /** Render Methods **/
  renderPracticeTile(e, i) {
    const { completedProblems, id, problems } = this.props;

    const sectionProblems =
      problems && problems.length > 0
        ? problems.filter(problem => {
            return problem.section_id === e.section_id;
          })
        : [];

    if (sectionProblems.length) {
      return (
        <PracticeTile
          problems={sectionProblems}
          key={i}
          bookId={id}
          chapter={e.book_chapter}
          section={e.section_number}
          completedProblems={completedProblems}
        />
      );
    }
  }

  render() {
    const { bookSections } = this.props;

    return (
      <div className="practicelist">
        <h1>PRACTICE</h1>
        <div className="practicegrid">
          {bookSections && bookSections.length > 0
            ? bookSections.map((e, i) => {
                return this.renderPracticeTile(e, i);
              })
            : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    problems: state.problems,
    completedProblems: state.completedProblems,
    bookSections: state.bookSections
  };
}

export default connect(
  mapStateToProps,
  {
    getCompletedProblems,
    getProblems,
    getBookSections
  }
)(PracticeContainer);
