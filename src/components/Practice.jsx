import React, { Component } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import axios from "axios";
import { getPath, getUserInfo } from "../ducks/reducer";
import Footer from "./Footer";

const videoStyle = {
  border: "solid",
  borderWidth: "2px",
  borderColor: "var(--logo-gray)",
  padding: "2px",
  borderRadius: "2px"
};

const videoModal = {
  content: {
    width: "60%",
    height: "450px",
    background: "white",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px"
  }
};

class Practice extends Component {
  constructor() {
    super();

    this.state = {
      practiceProblems: [],
      completedProblems: [],
      videoUrl: ""
    };
    this.openVideoModal = this.openVideoModal.bind(this);
    this.closeVideoModal = this.closeVideoModal.bind(this);
    this.completeProblem = this.completeProblem.bind(this);
    this.undoCompleteProblem = this.undoCompleteProblem.bind(this);
  }

  componentDidMount() {
    this.props.getPath(this.props.location.pathname);
    this.props.getUserInfo();
    let practiceProblems = axios.get(
      "/api/sectionproblems/" + this.props.match.params.section
    );
    let completedProblems = axios.get(
      "/api/sectioncompletedproblems/" + this.props.match.params.section
    );
    axios.all([practiceProblems, completedProblems]).then(res => {
      this.setState({
        practiceProblems: res[0].data,
        completedProblems: res[1].data
      });
    });
    Modal.setAppElement("body");
  }

  openVideoModal(e) {
    this.setState({
      videoUrl: e,
      videoModal: true
    });
  }

  closeVideoModal() {
    this.setState({
      solution: "",
      videoModal: false
    });
  }

  completeProblem(e) {
    axios
      .post("/api/completeproblem", {
        problemId: e,
        sectionId: this.props.match.params.section
      })
      .then(res => {
        this.setState({
          completedProblems: res.data
        });
      });
  }

  undoCompleteProblem(e) {
    axios
      .delete(
        "/api/uncompleteproblem/" + e + "/" + this.props.match.params.section
      )
      .then(res => {
        this.setState({
          completedProblems: res.data
        });
      });
  }

  render() {
    let pageTitle =
      "Section " +
      this.props.match.params.chapter +
      "." +
      this.props.match.params.section +
      " Practice";
    let problemsMap =
      this.state.practiceProblems.length > 0
        ? this.state.practiceProblems.map((e, i) => {
            let image =
              "http://res.cloudinary.com/symplit/image/upload/" +
              e.problem_image;
            let completed =
              typeof this.state.completedProblems === "object" &&
              this.state.completedProblems.length > 0
                ? this.state.completedProblems.map((x, y) => {
                    return x.problem_id;
                  })
                : null;
            let problemClass =
              completed && completed.includes(e.problem_id)
                ? "problemcompleted"
                : "problemtile";
            let completedButton =
              completed && completed.includes(e.problem_id) ? (
                <button
                  className="completebutton"
                  onClick={() => this.undoCompleteProblem(e.problem_id)}
                >
                  UnMark as Complete
                </button>
              ) : (
                <button
                  className="completebutton"
                  onClick={() => this.completeProblem(e.problem_id)}
                >
                  Mark as Complete
                </button>
              );
            return (
              <div key={e.problem_id} className={problemClass}>
                <img src={image} alt={e.problem_image} />
                <div className="practicebuttoncontainer">
                  <button
                    onClick={() => this.openVideoModal(e.problem_solution)}
                  >
                    See Solution
                  </button>
                  {completedButton}
                </div>
              </div>
            );
          })
        : null;

    return (
      <div>
        <div className="practicecontent">
          <h1>{pageTitle}</h1>
          {problemsMap}
        </div>
        <Footer />
        <Modal
          isOpen={this.state.videoModal}
          onRequestClose={this.closeVideoModal}
          style={videoModal}
        >
          <div className="closebuttoncontainer">
            <button onClick={this.closeVideoModal} className="closebutton">
              X
            </button>
          </div>
          <div className="problemplayer">
            <ReactPlayer url={this.state.videoUrl} style={videoStyle} />
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUserInfo, getPath })(Practice);
