/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getPath,
  getProblem,
  getProblems,
  createProblem,
  updateProblem,
  deleteProblem,
  getCompletedProblems
} from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
import AdminButton from "../../Atoms/AdminButton/AdminButton";
import PracticeProblem from "../../Molecules/PracticeProblem/PracticeProblem";
import PracticeModal from "../../Modals/PracticeModal";
import DeleteModal from "../../Modals/DeleteModal";
import SolutionModal from "../../Modals/SolutionModal";
import Footer from "../../Molecules/Footer/Footer";

/** Exported Component **/
class Practice extends Component {
  constructor() {
    super();

    this.state = {
      addModal: false,
      editModal: false,
      deleteModal: false,
      problemTitle: "",
      problemImage: "",
      problemSolution: "",
      memRequired: false,
      memIds: "",
      videoUrl: "",
      solutionModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateProblem = this.updateProblem.bind(this);
    this.deleteProblem = this.deleteProblem.bind(this);
    this.addProblem = this.addProblem.bind(this);
  }

  /** LifeCycle Methods **/
  componentDidMount() {
    const { getPath, location, getProblems, match } = this.props;
    getPath(location.pathname);
    getProblems(match.params.book);
    getCompletedProblems();
  }

  /** Interaction Methods **/
  openModal(type, id) {
    const key = `${type}Modal`;
    const { getProblem } = this.props;
    if (id) {
      getProblem(id);
    }
    this.setState({
      [key]: true,
      videoUrl: ""
    });
  }

  openSolution(e) {
    this.setState({
      videoUrl: e,
      solutionModal: true
    });
  }

  closeModal(type) {
    const key = `${type}Modal`;
    this.setState({
      [key]: false
    });
  }

  handleInputUpdate(key, value) {
    this.setState({
      [key]: value
    });
  }

  handleImage() {
    let _this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "symplit", upload_preset: "rg7skvww" },
      function(error, result) {
        for (var i = result[0].path.length - 1; i > 0; i--) {
          if (result[0].path[i] === "/") {
            break;
          }
          _this.setState({
            problemImage: result[0].path.slice(i)
          });
        }
      }
    );
  }

  addProblem() {}

  updateProblem() {}

  deleteProblem() {}

  /** Render Methods **/
  renderAdminButton() {
    return (
      <AdminButton onClick={() => this.openModal("add")} color="blue">
        Add Problem
      </AdminButton>
    );
  }

  renderPracticeProblem(e, i) {
    const { user, completedProblems, match } = this.props;

    let completed = false;

    if (completedProblems && completedProblems.length) {
      completedProblems.forEach(problem => {
        if (
          match.problem === problem.problem_id &&
          match.section === problem.section_id
        ) {
          completed = true;
        }
      });
    }

    return (
      <PracticeProblem
        problem={e}
        key={i}
        openModal={this.openModal}
        user={user}
        completed={completed}
        section={match.section}
      />
    );
  }

  render() {
    const { match, problems, problem } = this.props;
    const {
      addModal,
      editModal,
      deleteModal,
      problemTitle,
      problemImage,
      problemSolution,
      memRequired,
      memIds,
      videoUrl,
      solutionModal
    } = this.state;

    let pageTitle =
      "Section " +
      match.params.chapter +
      "." +
      match.params.section +
      " Practice";

    let sectionProblems =
      problems && problems.length
        ? problems.filter(problem => {
            return (
              problem.section_number === match.params.section &&
              problem.book_chapter === +match.params.chapter
            );
          })
        : [];

    return (
      <div className="practicecontent">
        <h1>{pageTitle}</h1>
        {sectionProblems && sectionProblems.length
          ? sectionProblems.map((e, i) => {
              return this.renderPracticeProblem(e, i);
            })
          : null}

        <SolutionModal
          videoUrl={videoUrl}
          active={solutionModal}
          closeModal={this.closeModal}
        />

        <PracticeModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          onChange={this.handleInputUpdate}
          handleImage={this.handleImage}
          submit={this.addProblem}
          problemTitle={problemTitle}
          problemImage={problemImage}
          problemSolution={problemSolution}
          memRequired={memRequired}
          memIds={memIds}
        />

        <PracticeModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          handleImage={this.handleImage}
          submit={this.updateProblem}
          problemTitle={problem && problem.problem_title}
          problemImage={problem && problem.problem_image}
          problemSolution={problem && problem.problem_solution}
          memRequired={problem && problem.membership_required_problem}
          memIds={problem && problem.membership_ids}
        />

        <DeleteModal
          active={deleteModal}
          closeModal={() => this.closeModal("delete")}
          submit={this.deleteProblem}
        />

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    problems: state.problems,
    problem: state.problem,
    completedProblems: state.completedProblems
  };
}

export default connect(
  mapStateToProps,
  {
    getPath,
    getProblem,
    getProblems,
    getCompletedProblems,
    updateProblem,
    deleteProblem,
    createProblem
  }
)(Practice);
