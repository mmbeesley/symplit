/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter
} from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
import AdminButton from "../../Atoms/AdminButton/AdminButton";
import ChapterLink from "../../Atoms/ChapterLink/ChapterLink";
import ChapterModal from "../../Modals/ChapterModal";
import DeleteModal from "../../Modals/DeleteModal";

/** Exported Component **/
class StudyContainer extends Component {
  constructor() {
    super();

    this.state = {
      addModal: false,
      editModal: false,
      deleteModal: false,
      bookChapter: null,
      chapterTitle: "",
      chapterMemRequired: false,
      chapterMemIds: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.addChapter = this.addChapter.bind(this);
    this.updateChapter = this.updateChapter.bind(this);
    this.deleteChapter = this.deleteChapter.bind(this);
  }

  /** LifeCycle Methods **/
  componentDidMount() {
    const { getChapters, id } = this.props;
    getChapters(id);
  }

  /** Interaction Methods **/
  openModal(type, id) {
    const key = `${type}Modal`;
    const { getChapter } = this.props;
    if (id) {
      getChapter(id);
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

  addChapter() {
    const { id, createChapter } = this.props;
    const {
      bookChapter,
      chapterTitle,
      chapterMemRequired,
      chapterMemIds
    } = this.state;
    const body = {
      book_id: id,
      book_chapter: bookChapter,
      chapter_title: chapterTitle,
      membership_required_chapter: chapterMemRequired,
      membership_ids: chapterMemIds
    };

    createChapter(body);
  }

  updateChapter() {
    const { id, updateChapter, chapter } = this.props;
    const {
      bookChapter,
      chapterTitle,
      chapterMemRequired,
      chapterMemIds
    } = this.state;
    const body = {
      book_id: id,
      book_chapter: bookChapter || chapter.book_chapter,
      chapter_title: chapterTitle || chapter.chapter_title,
      membership_required_chapter:
        chapterMemRequired || chapter.membership_required_chapter,
      membership_ids: chapterMemIds || chapter.membership_ids
    };
    const chapId = chapter.chapter_id;

    updateChapter(chapId, body);
  }

  deleteChapter() {
    const { id, deleteChapter, chapter } = this.props;
    const chapId = chapter.chapter_id;

    deleteChapter(chapId, id);
  }

  /** Render Methods **/
  renderAdminButton() {
    return (
      <AdminButton onClick={() => this.openModal("add")} color="blue">
        Add Chapter
      </AdminButton>
    );
  }

  renderChapterLink(e, i) {
    const { user, id } = this.props;
    return (
      <ChapterLink
        chapter={e}
        key={i}
        openModal={this.openModal}
        user={user}
        bookId={id}
      />
    );
  }

  render() {
    const { chapters, user, chapter } = this.props;
    const {
      addModal,
      editModal,
      deleteModal,
      bookChapter,
      chapterTitle,
      chapterMemRequired,
      chapterMemIds
    } = this.state;

    return (
      <div className="chapterlist">
        <h1>STUDY</h1>
        {user && !user.is_admin ? null : this.renderAdminButton()}
        <div className="chaptergrid">
          {chapters && chapters.length > 0
            ? chapters.map((e, i) => {
                return this.renderChapterLink(e, i);
              })
            : null}
        </div>

        <ChapterModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          onChange={this.handleInputUpdate}
          chapterTitle={chapterTitle}
          bookChapter={bookChapter}
          memRequired={chapterMemRequired}
          memIds={chapterMemIds}
          submit={this.addChapter}
        />

        <ChapterModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          chapterTitle={chapter && chapter.chapter_title}
          bookChapter={chapter && chapter.book_chapter}
          memRequired={chapter && chapter.membership_required_chapter}
          memIds={chapter && chapter.membership_ids}
          submit={this.updateChapter}
        />

        <DeleteModal
          active={deleteModal}
          closeModal={() => this.closeModal("delete")}
          submit={this.deleteChapter}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chapters: state.chapters,
    chapter: state.chapter,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {
    getChapter,
    getChapters,
    createChapter,
    updateChapter,
    deleteChapter
  }
)(StudyContainer);
