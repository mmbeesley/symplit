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
} from "../../../ducks";

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

    this.state = {};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
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
    const { createSectionVideo, section } = this.props;
    const {
      selectedVideo,
      sectionVideoTitle,
      sectionVideoText,
      memRequired,
      memIds,
      videoHandout
    } = this.state;
    const body = {
      section_id: section.sectionId,
      video_id: selectedVideo.video_id,
      sectionvideo_title: sectionVideoTitle,
      sectionvideo_text: sectionVideoText,
      membership_required_video: memRequired,
      membership_ids: memIds,
      sectionvideo_handout: videoHandout
    };

    createSectionVideo(body);
  }

  updateSectionVideo() {
    const { updateSectionVideo, section, sectionVideo } = this.props;
    const {
      selectedVideo,
      sectionVideoTitle,
      sectionVideoText,
      memRequired,
      memIds,
      videoHandout
    } = this.state;
    const body = {
      section_id: section.sectionId,
      video_id: selectedVideo.video_id,
      sectionvideo_title: sectionVideoTitle,
      sectionvideo_text: sectionVideoText,
      membership_required_video: memRequired,
      membership_ids: memIds,
      sectionvideo_handout: videoHandout
    };
    const id = sectionVideo.section_video_id;

    updateSectionVideo(id, body);
  }

  deleteSectionVideo() {
    const { deleteSectionVideo, sectionVideo } = this.props;
    const id = sectionVideo.section_video_id;

    deleteSectionVideo(id);
  }

  handleVideoSelect(e) {
    this.setState({
      selectedVideo: e,
      videoSelectModal: false
    });
  }

  addVideo() {
    const { createVideo } = this.props;
    const { videoTitle, videoUrl } = this.state;
    const body = {
      video_title: videoTitle,
      video_url: videoUrl
    };

    createVideo(body);
  }

  updateVideo() {
    const { updateVideo, video } = this.props;
    const { videoTitle, videoUrl } = this.state;
    const body = {
      video_title: videoTitle,
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
    return (
      <SectionVideo
        key={e.sectionVideoTitle}
        video={e}
        openModal={this.openModal}
        user={user}
      />
    );
  }

  render() {
    const {
      section,
      match,
      user,
      openModal,
      sectionVideo,
      videos,
      video
    } = this.props;
    const { sectionTitle, sectionNumber, sectionVideos } = section;
    const {
      addModal,
      editModal,
      deleteModal,
      videoSelectModal,
      videoAddModal,
      videoEditModal,
      videoDeleteModal,
      sectionVideoTitle,
      sectionVideoText,
      memRequired,
      memIds,
      videoHandout,
      videoTitle,
      vimeoVideoTitle,
      vimeoVideoUrl
    } = this.state;

    return (
      <a name={sectionTitle} className="sectionbodycontainer">
        <div className="bodysectiontitle">
          {match.params.chapter}.{sectionNumber} {sectionTitle}
        </div>
        <div className="adminbuttoncontainer">
          {!user.is_admin ? null : (
            <AdminButton onClick={() => this.openModal("add")} color="blue">
              Add Video
            </AdminButton>
          )}
          {!user.is_admin ? null : (
            <AdminButton
              onClick={() => openModal("edit", sectionNumber)}
              color="blue"
            >
              Edit Section
            </AdminButton>
          )}
          {!user.is_admin ? null : (
            <AdminButton
              onClick={() => openModal("delete", sectionNumber)}
              color="blue"
            >
              Delete Section
            </AdminButton>
          )}
        </div>
        <div className="bodyvideocontainer">
          {sectionVideos && sectionVideos.length
            ? sectionVideos.map((e, i) => {
                return this.renderSectionVideo(e, i);
              })
            : null}
        </div>

        <SectionVideoModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          onChange={this.handleInputUpdate}
          sectionVideoTitle={sectionVideoTitle}
          sectionVideoText={sectionVideoText}
          openModal={this.openModal}
          videoTitle={videoTitle}
          memRequired={memRequired}
          memIds={memIds}
          handleHandout={this.handleHandout}
          videoHandout={videoHandout}
          submit={this.addSectionVideo}
        />

        <SectionVideoModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          sectionVideoTitle={sectionVideo && sectionVideo.section_video_title}
          sectionVideoText={sectionVideo && sectionVideo.section_video_text}
          openModal={this.openModal}
          videoTitle={sectionVideo && sectionVideo.video_title}
          memRequired={sectionVideo && sectionVideo.membership_required_video}
          memIds={sectionVideo && sectionVideo.membership_ds}
          handleHandout={this.handleHandout}
          videoHandout={sectionVideo && sectionVideo.section_video_handout}
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
          vimeoVideoTitle={vimeoVideoTitle}
          vimeoVideoUrl={vimeoVideoUrl}
          submit={this.addVideo}
        />

        <VideoModal
          active={videoEditModal}
          closeModal={() => this.closeModal("videoEdit")}
          vimeoVideoTitle={video && video.video_title}
          vimeoVideoUrl={video && video.video_url}
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
