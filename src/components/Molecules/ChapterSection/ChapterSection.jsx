/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { connect } from "react-redux";
import {
  getSectionVideo,
  getVideo,
  createSectionVideo,
  updateSectionVideo,
  deleteSectionVideo,
  createVideo,
  updateVideo,
  deleteVideo
} from "../../../ducks/reducers";

/** Imported Components **/
import AdminButton from "../../Atoms/AdminButton/AdminButton";
import SectionVideo from "../../Atoms/SectionVideo/SectionVideo";
import SectionVideoModal from "../../Modals/SectionVideoModal";
import DeleteModal from "../../Modals/DeleteModal";
import VideoSelectModal from "../../Modals/VideoSelectModal";
import VideoModal from "../../Modals/VideoModal";

/** Exported Component **/
class ChapterSection extends Component {
  constructor() {
    super();

    this.state = {
      addModal: false,
      editModal: false,
      deleteModal: false,
      videoSelectModal: false,
      videoAddModal: false,
      videoEditModal: false,
      videoDeleteModal: false,
      section_video_title: "",
      section_video_text: "",
      membership_required_video: false,
      membership_ids: "",
      section_video_handout: "",
      selectedVideo: {},
      video_title: "",
      video_url: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleHandout = this.handleHandout.bind(this);
    this.addSectionVideo = this.addSectionVideo.bind(this);
    this.updateSectionVideo = this.updateSectionVideo.bind(this);
    this.deleteSectionVideo = this.deleteSectionVideo.bind(this);
    this.handleVideoSelect = this.handleVideoSelect.bind(this);
    this.addVideo = this.addVideo.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
  }

  /** Interaction Methods **/
  openModal(type, id) {
    const key = `${type}Modal`;
    const { getSectionVideo, getVideo } = this.props;
    if (type.includes("video") && id) {
      getVideo(id);
    } else if (id) {
      getSectionVideo(id);
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

  addSectionVideo() {
    const { createSectionVideo, section, match } = this.props;
    const {
      selectedVideo,
      section_video_title,
      section_video_text,
      membership_required_video,
      membership_ids,
      section_video_handout
    } = this.state;
    const body = {
      section_id: section.sectionId,
      video_id: selectedVideo.video_id,
      section_video_title,
      section_video_text,
      membership_required_video,
      membership_ids,
      section_video_handout,
      chapterId: +match.params.chapter
    };

    createSectionVideo(body);
  }

  updateSectionVideo() {
    const { updateSectionVideo, section, sectionVideo, match } = this.props;
    const {
      selectedVideo,
      section_video_title,
      section_video_text,
      membership_required_video,
      membership_ids,
      section_video_handout
    } = this.state;
    const body = {
      section_id: section.sectionId,
      video_id: selectedVideo.video_id,
      section_video_title,
      section_video_text,
      membership_required_video,
      membership_ids,
      section_video_handout,
      chapterId: +match.params.chapter
    };
    const id = sectionVideo.section_video_id;

    updateSectionVideo(id, body);
  }

  deleteSectionVideo() {
    const { deleteSectionVideo, sectionVideo, match } = this.props;
    const id = sectionVideo.section_video_id;

    deleteSectionVideo(id, match.params.chapter);
  }

  handleVideoSelect(e) {
    this.setState({
      selectedVideo: e,
      videoSelectModal: false
    });
  }

  addVideo() {
    const { createVideo } = this.props;
    const { video_title, videoUrl } = this.state;
    const body = {
      video_title: video_title,
      video_url: videoUrl
    };

    createVideo(body);
  }

  updateVideo() {
    const { updateVideo, video } = this.props;
    const { video_title, videoUrl } = this.state;
    const body = {
      video_title: video_title,
      video_url: videoUrl
    };
    const id = video.video_id;

    updateVideo(id, body);
  }

  deleteVideo() {
    const { deleteVideo, video } = this.props;
    const id = video.video_id;

    deleteVideo(id);
  }

  /** Render Methods **/
  renderSectionVideo(e, i) {
    const { user } = this.props;
    console.log(e);
    return (
      <SectionVideo
        key={e.section_video_title}
        video={e}
        openModal={this.openModal}
        user={user}
      />
    );
  }

  render() {
    const { section, match, user, openModal, videos } = this.props;
    const { section_title, section_number, section_videos } = section;
    const {
      addModal,
      editModal,
      deleteModal,
      videoSelectModal,
      videoAddModal,
      videoEditModal,
      videoDeleteModal,
      section_video_title,
      section_video_text,
      membership_required_video,
      membership_ids,
      section_video_handout,
      selectedVideo,
      video_title,
      video_url
    } = this.state;

    return (
      <a name={section_title} className="sectionbodycontainer">
        <div className="bodysectiontitle">
          {match.params.chapter}.{section_number} {section_title}
        </div>
        <div className="adminbuttoncontainer">
          {!user.is_admin ? null : (
            <AdminButton onClick={() => this.openModal("add")} color="blue">
              Add Video
            </AdminButton>
          )}
          {!user.is_admin ? null : (
            <AdminButton
              onClick={() => openModal("edit", section_number)}
              color="blue"
            >
              Edit Section
            </AdminButton>
          )}
          {!user.is_admin ? null : (
            <AdminButton
              onClick={() => openModal("delete", section_number)}
              color="blue"
            >
              Delete Section
            </AdminButton>
          )}
        </div>
        <div className="bodyvideocontainer">
          {section_videos && section_videos.length
            ? section_videos.map((e, i) => {
                return this.renderSectionVideo(e, i);
              })
            : null}
        </div>

        <SectionVideoModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          onChange={this.handleInputUpdate}
          section_video_title={section_video_title}
          section_video_text={section_video_text}
          openModal={this.openModal}
          video_title={selectedVideo && selectedVideo.video_title}
          membership_required_video={membership_required_video}
          membership_ids={membership_ids}
          handleHandout={this.handleHandout}
          section_video_handout={section_video_handout}
          submit={this.addSectionVideo}
        />

        <SectionVideoModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          section_video_title={section_video_title}
          section_video_text={section_video_text}
          openModal={this.openModal}
          video_title={video_title}
          membership_required_video={membership_required_video}
          membership_ids={membership_ids}
          handleHandout={this.handleHandout}
          section_video_handout={section_video_handout}
          submit={this.updateSectionVideo}
        />

        <DeleteModal
          active={deleteModal}
          closeModal={() => this.closeModal("delete")}
          submit={this.deleteSectionVideo}
        />

        <VideoSelectModal
          active={videoSelectModal}
          closeModal={() => this.closeModal("videoSelect")}
          videos={videos}
          openModal={this.openModal}
          selectVideo={this.handleVideoSelect.bind(this)}
        />

        <VideoModal
          active={videoAddModal}
          closeModal={() => this.closeModal("videoAdd")}
          onChange={this.handleInputUpdate}
          video_title={video_title}
          video_url={video_url}
          submit={this.addVideo}
        />

        <VideoModal
          active={videoEditModal}
          closeModal={() => this.closeModal("videoEdit")}
          video_title={video_title}
          video_url={video_url}
          submit={this.updateVideo}
        />

        <DeleteModal
          active={videoDeleteModal}
          closeModal={() => this.closeModal("videoDelete")}
          submit={this.deleteVideo}
        />
      </a>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    sectionVideo: state.sectionVideo,
    videos: state.videos,
    video: state.video
  };
}

export default connect(
  mapStateToProps,
  {
    getSectionVideo,
    getVideo,
    createSectionVideo,
    createVideo,
    updateSectionVideo,
    updateVideo,
    deleteSectionVideo,
    deleteVideo
  }
)(ChapterSection);
