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
      videoUrl: "",
      title: "",
      image: "",
      solution: "",
      mem_required: false,
      mem_ids: "",
      editing: null,
      deleting: null,
      sectionProblems: []
    };
    this.openVideoModal = this.openVideoModal.bind(this);
    this.closeVideoModal = this.closeVideoModal.bind(this);
    this.completeProblem = this.completeProblem.bind(this);
    this.undoCompleteProblem = this.undoCompleteProblem.bind(this);
    this.openAddProblemModal = this.openAddProblemModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.addProblem = this.addProblem.bind(this);
    this.editProblem = this.editProblem.bind(this);
    this.deleteProblem = this.deleteProblem.bind(this);
    this.closeAddProblemModal = this.closeAddProblemModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSolution = this.handleSolution.bind(this);
    this.handleMemRequired = this.handleMemRequired.bind(this);
    this.handleMemIds = this.handleMemIds.bind(this);
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
    // let section = 
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

  openAddProblemModal() {
    this.setState({
      addModal: true
    });
  }

  closeAddProblemModal() {
    this.setState({
      addModal: false
    });
  }

  openEditModal(e) {
    axios.get("/api/problem/" + e).then(res => {
      const {
        problem_title,
        problem_image,
        problem_solution,
        membership_required_problem,
        membership_ids
      } = res.data[0];
      this.setState({
        editModal: true,
        editing: e,
        title: problem_title,
        image: problem_image,
        solution: problem_solution,
        mem_required: membership_required_problem,
        mem_ids: membership_ids
      });
    });
  }

  closeEditModal() {
    this.setState({
      editModal: false,
      editing: null
    });
  }

  openDeleteModal(e) {
    this.setState({
      deleteModal: true,
      deleting: e
    });
  }

  closeDeleteModal() {
    this.setState({
      deleteModal: false,
      deleting: null
    });
  }

  addProblem() {
    const { title, image, solution, mem_required, mem_ids } = this.state;
    const { section } = this.props.match.params;
    let body = {
      problem_title: title,
      problem_image: image,
      problem_solution: solution,
      membership_required: mem_required,
      membership_ids: mem_ids,
      section_id: section
    };

    axios.post("/api/problems", body).then(res => {
      this.setState({
        practiceProblems: res.data,
        title: "",
        image: "",
        solution: "",
        mem_required: "",
        mem_ids: "",
        addModal: false
      });
    });
  }

  editProblem() {
    const {
      title,
      image,
      solution,
      mem_required,
      mem_ids,
      editing
    } = this.state;
    const { section } = this.props.match.params;
    let body = {
      problem_title: title,
      problem_image: image,
      problem_solution: solution,
      membership_required: mem_required,
      membership_ids: mem_ids,
      section_id: section
    };

    axios.put("/api/problems/" + editing, body).then(res => {
      this.setState({
        practiceProblems: res.data,
        title: "",
        image: "",
        solution: "",
        mem_required: false,
        mem_ids: "",
        editing: null,
        editModal: false
      });
    });
  }

  deleteProblem() {
    const { deleting } = this.state;
    const { section } = this.props.match.params;
    axios
      .delete("/api/problems/" + this.state.deleting + "/" + section)
      .then(res => {
        this.setState({
          practiceProblems: res.data,
          deleting: null,
          deleteModal: false
        });
      });
  }

  handleTitle(e) {
    this.setState({
      title: e
    });
  }

  handleImage(e) {
    this.setState({
      image: e
    });
  }

  handleSolution(e) {
    this.setState({
      solution: e
    });
  }

  handleMemRequired(e) {
    this.setState({
      mem_required: e
    });
  }

  handleMemIds(e) {
    this.setState({
      mem_ids: e
    });
  }

  openSelectModal() {
    this.setState({
        selectModal: true
    })
  }

  handleSelect(e) {

  }

  closeSelectModal() {
    this.setState({
        selectModal: false
    })
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

        <Modal
          isOpen={this.state.addModal}
          onRequestClose={this.closeAddProblemModal}
          style={videoModal}
        >
          <button onClick={this.closeAddProblemModal}>Close</button>
          <div className="checkboxfield">
            Problem Title:{" "}
            <input
              placeholder="Problem Title"
              value={this.state.title}
              onChange={e => this.handleTitle(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Problem Image:{" "}
            <input
              placeholder="Problem Image"
              value={this.state.image}
              onChange={e => this.handleImage(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Problem Solution:{" "}
            <input
              placeholder="Problem Solution"
              value={this.state.solution}
              onChange={e => this.handleSolution(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Membership Required?{" "}
            <input
              value={this.state.mem_required}
              onChange={e => this.handleMemRequired(e.target.checked)}
              type="checkbox"
            />
          </div>
          <div className="checkboxfield">
            Membership Ids:{" "}
            <input
              placeholder="Membership Ids"
              value={this.state.mem_ids}
              onChange={e => this.handleMemIds(e.target.value)}
            />
          </div>
          <button onClick={this.addProblem}>Submit</button>
        </Modal>

        <Modal
          isOpen={this.state.editModal}
          onRequestClose={this.closeEditModal}
          style={videoModal}
        >
          <button onClick={this.closeEditModal}>Close</button>
          <div className="checkboxfield">
            Problem Title:{" "}
            <input
              placeholder="Problem Title"
              value={this.state.title}
              onChange={e => this.handleTitle(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Problem Image:{" "}
            <input
              placeholder="Problem Image"
              value={this.state.image}
              onChange={e => this.handleImage(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Problem Solution:{" "}
            <input
              placeholder="Problem Solution"
              value={this.state.solution}
              onChange={e => this.handleSolution(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Membership Required?{" "}
            <input
              value={this.state.mem_required}
              onChange={e => this.handleMemRequired(e.target.checked)}
              type="checkbox"
            />
          </div>
          <div className="checkboxfield">
            Membership Ids:{" "}
            <input
              placeholder="Membership Ids"
              value={this.state.mem_ids}
              onChange={e => this.handleMemIds(e.target.value)}
            />
          </div>
          <button onClick={this.editProblem}>Submit</button>
        </Modal>

        <Modal
          isOpen={this.state.deleteModal}
          onRequestClose={this.closeDeleteModal}
          style={videoModal}
        >
          <button onClick={this.closeDeleteModal}>Close</button>
          <div>Are you sure you want to delete this?</div>
          <button onClick={this.deleteProblem}>Delete</button>
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
