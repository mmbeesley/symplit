/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getPath,
  getBook,
  getChapter,
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  getVideos
} from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Imported Components **/
import BookCrumb from "../../Atoms/BookCrumb/BookCrumb";
import ChapterDetailNav from "../../Molecules/ChapterDetailNav/ChapterDetailNav";
import Footer from "../../Molecules/Footer/Footer";
import ChapterSection from "../../Molecules/ChapterSection/ChapterSection";
import SectionModal from "../../Modals/SectionModal";
import DeleteModal from "../../Modals/DeleteModal";

/** Exported Component **/
class SingleChapter extends Component {
  constructor() {
    super();

    this.state = {
      sectionNumber: null,
      sectionTitle: "",
      sectionText: "",
      memRequired: false,
      memIds: "",
      problemIds: "",
      sectionHandout: "",
      addModal: false,
      editModal: false,
      deleteModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleHandout = this.handleHandout.bind(this);
    this.addSection = this.addSection.bind(this);
    this.updateSection = this.updateSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
  }
  /** LifeCycle Methods */
  componentDidMount() {
    const {
      getPath,
      location,
      getBook,
      getChapter,
      getSections,
      getVideos,
      match
    } = this.props;

    getPath(location.pathname);
    getBook(match.params.book);
    getChapter(match.params.chapter);
    getSections(match.params.chapter);
    getVideos();
  }

  /** Interaction Methods **/
  openModal(type, id) {
    const key = `${type}Modal`;
    const { getSection, match } = this.props;
    if (id) {
      getSection(id, match.params.chapter);
    }
    this.setState({
      [key]: true
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

  handleHandout() {
    let _this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "symplit", upload_preset: "rg7skvww" },
      function(error, result) {
        for (var i = result[0].path.length - 1; i > 0; i--) {
          if (result[0].path[i] === "/") {
            break;
          }
          _this.setState({
            sectionHandout: result[0].path.slice(i)
          });
        }
      }
    );
  }

  addSection() {
    const {
      sectionNumber,
      sectionTitle,
      sectionText,
      memRequired,
      memIds,
      problemIds,
      sectionHandout
    } = this.state;
    const { match, createSection } = this.props;
    let body = {
      section_number: sectionNumber,
      section_title: sectionTitle,
      chapter_id: match.params.chapter,
      section_text: sectionText,
      membership_required_section: memRequired,
      membership_ids: memIds,
      problem_ids: problemIds,
      section_handout: sectionHandout
    };

    createSection(body);
  }

  updateSection() {
    const {
      sectionNumber,
      sectionTitle,
      sectionText,
      memRequired,
      memIds,
      problemIds,
      sectionHandout
    } = this.state;
    const { match, updateSection, section } = this.props;
    let body = {
      section_number: sectionNumber,
      section_title: sectionTitle,
      chapter_id: match.params.chapter,
      section_text: sectionText,
      membership_required_section: memRequired,
      membership_ids: memIds,
      problem_ids: problemIds,
      section_handout: sectionHandout
    };
    const id = section.sectionNumber;

    updateSection(id, body);
  }

  deleteSection() {
    const { section, deleteSection } = this.props;
    const id = section.sectionNumber;

    deleteSection(id);
  }

  /** Render Methods **/
  renderSection(e, i) {
    const { match } = this.props;
    return (
      <ChapterSection
        section={e}
        key={e.sectionTitle}
        match={match}
        openModal={this.openModal}
      />
    );
  }

  render() {
    const { sections, book, chapter, user, match, section } = this.props;
    const {
      sectionNumber,
      sectionTitle,
      sectionText,
      memRequired,
      memIds,
      problemIds,
      sectionHandout,
      addModal,
      editModal,
      deleteModal
    } = this.state;

    return (
      <div className="singlechapterbody">
        <div className="booknavcontainer">
          <BookCrumb
            book={book}
            chapter={chapter}
            user={user}
            openModal={this.openModal}
          />
          <ChapterDetailNav
            sections={sections}
            chapter={match.params.chapter}
          />
        </div>
        <div className="singlechaptercontent">
          {sections && sections.length
            ? sections.map((e, i) => {
                return this.renderSection(e, i);
              })
            : null}
          <Footer />
        </div>

        <SectionModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          handleHandout={this.handleHandout}
          onChange={this.handleInputUpdate}
          sectionTitle={sectionTitle}
          sectionNumber={sectionNumber}
          sectionSummary={sectionText}
          memRequired={memRequired}
          memIds={memIds}
          problemIds={problemIds}
          sectionHandout={sectionHandout}
          submit={this.addSection}
        />

        <SectionModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          handleHandout={this.handleHandout}
          onChange={this.handleInputUpdate}
          sectionTitle={section && section.section_title}
          sectionNumber={section && section.section_number}
          sectionSummary={section && section.section_text}
          memRequired={section && section.mem_required_section}
          memIds={section && section.mem_ids_section}
          problemIds={section && section.practice_problem_ids}
          sectionHandout={section && section.section_handout}
          submit={this.updateSection}
        />

        <DeleteModal
          active={deleteModal}
          closeModal={() => this.closeModal("delete")}
          submit={this.deleteSection}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    book: state.book,
    chapter: state.chapter,
    sections: state.sections,
    section: state.section
  };
}

export default connect(
  mapStateToProps,
  {
    getPath,
    getBook,
    getChapter,
    getSections,
    getSection,
    createSection,
    updateSection,
    deleteSection,
    getVideos
  }
)(SingleChapter);
