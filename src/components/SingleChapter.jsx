import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import Modal from 'react-modal';

const videoStyle = {
    border: "solid",
    borderWidth: "2px",
    borderColor: "var(--logo-gray)",
    padding: "2px",
    borderRadius: "2px"
}

const addStyles = {
    content: {
        width: "50%",
        height: "400px",
        background: "white",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "50px",
        overflowY: "scroll"
    }
}

class SingleChapter extends Component {
    constructor() {
        super();

        this.state = {
            book: [],
            chapter: [],
            sections: [],
            chapSections: [],
            videos: [],
            sectionTitle: '',
            sectionNumber: null,
            sectionText: '',
            memRequiredSection: false,
            memIdsSection: [],
            practiceProblemsIds: [],
            sectionHandout: '',
            sectionVideoTitle: '',
            sectionVideoText: '',
            memRequiredVideo: false,
            memIdsVideo: [],
            sectionVideoHandout: '',
            sectionVideo: {},
            vimeoVideoTitle: '',
            vimeoVideoUrl: ''
        }
        this.openAddSectionModal = this.openAddSectionModal.bind(this);
        this.openSectionDeleteModal = this.openSectionDeleteModal.bind(this);
        this.openSectionEditModal = this.openSectionEditModal.bind(this);
        this.closeAddSectionModal = this.closeAddSectionModal.bind(this);
        this.closeSectionDeleteModal = this.closeSectionDeleteModal.bind(this);
        this.closeSectionEditModal = this.closeSectionEditModal.bind(this);
        this.handleSectionTitle = this.handleSectionTitle.bind(this);
        this.handleSectionNumber = this.handleSectionNumber.bind(this);
        this.handleSectionText = this.handleSectionText.bind(this);
        this.handleSectionMemRequired = this.handleSectionMemRequired.bind(this);
        this.handleSectionMemIds = this.handleSectionMemIds.bind(this);
        this.handlePracticeProblemIds = this.handlePracticeProblemIds.bind(this);
        this.handleSectionPDF = this.handleSectionPDF.bind(this);
        this.addSection = this.addSection.bind(this);
        this.updateSection = this.updateSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.openVideoAddModal = this.openVideoAddModal.bind(this);
        this.closeVideoAddModal = this.closeVideoAddModal.bind(this);
        this.videoEditModal = this.videoEditModal.bind(this);
        this.closeVideoEditModal = this.closeVideoEditModal.bind(this);
        this.videoDeleteModal = this.videoDeleteModal.bind(this);
        this.closeVideoDeleteModal = this.closeVideoDeleteModal.bind(this);
        this.handleSectionVideoTitle = this.handleSectionVideoTitle.bind(this);
        this.handleSectionVideoText = this.handleSectionVideoText.bind(this);
        this.handleSectionVideoMemRequired = this.handleSectionVideoMemRequired.bind(this);
        this.handleSectionVideoMemIds = this.handleSectionVideoMemIds.bind(this);
        this.handleSectionVideoPDF = this.handleSectionVideoPDF.bind(this);
        this.openVideosModal = this.openVideosModal.bind(this);
        this.closeVideosModal = this.closeVideosModal.bind(this);
        this.addSectionVideo = this.addSectionVideo.bind(this);
        this.editSectionVideo = this.editSectionVideo.bind(this);
        this.deleteSectionVideo = this.deleteSectionVideo.bind(this);
        this.vimeoModal = this.vimeoModal.bind(this);
        this.closeVimeoModal = this.closeVimeoModal.bind(this);
        this.addVimeoLink = this.addVimeoLink.bind(this);
        this.handleVimeoVideoTitle = this.handleVimeoVideoTitle.bind(this);
        this.handleVimeoVideoUrl = this.handleVimeoVideoUrl.bind(this);
        this.vimeoEditModal = this.vimeoEditModal.bind(this);
        this.closeVimeoEditModal = this.closeVimeoEditModal.bind(this);
        this.vimeoDeleteModal = this.vimeoDeleteModal.bind(this);
        this.closeVimeoDeleteModal = this.closeVimeoDeleteModal.bind(this);
        this.vimeoDelete = this.vimeoDelete.bind(this);
        this.vimeoEdit = this.vimeoEdit.bind(this);
    }

    componentDidMount() {
        let chapterId = this.props.match.params.chapter
        let bookId = this.props.match.params.book
        let sections = axios.get('/api/sections/' + chapterId);
        let chapter = axios.get('/api/chapter/' + chapterId);
        let book = axios.get('/api/books/' + bookId);
        let chapSections = axios.get('/api/chapsections/' + chapterId);
        let videos = axios.get('/api/videos')
        this.props.getUserInfo();

        axios.all([sections, chapter, book, chapSections, videos]).then(res => {
            this.setState({
                sections: res[0].data,
                chapter: res[1].data,
                book: res[2].data,
                chapSections: res[3].data,
                videos: res[4].data
            })
        })
        Modal.setAppElement('body');
    }

    openAddSectionModal() {
        this.setState({
            addSectionModal: true
        })
    }

    openSectionDeleteModal(i) {
        this.setState({
            sectionDeleteModal: true,
            deleting: i
        })
    }

    openSectionEditModal(i) {
        axios.get('/api/section/' + i + '/' + this.props.match.params.chapter).then(section => {
            this.setState({
                sectionEditModal: true,
                editing: i,
                sectionTitle: section.data[0].section_title,
                sectionNumber: section.data[0].section_number,
                sectionText: section.data[0].section_text,
                memRequiredSection: section.data[0].membership_required_section,
                memIdsSection: section.data[0].membership_ids_section,
                practiceProblemsIds: section.data[0].practice_problems_ids,
                sectionHandout: section.data[0].section_handout
            })
        })
    }

    closeAddSectionModal() {
        this.setState({
            addSectionModal: false,
            sectionTitle: '',
            sectionNumber: null,
            sectionText: '',
            memRequiredSection: false,
            memIdsSection: [],
            practiceProblemsIds: [],
            sectionHandout: ''
        })
    }

    closeSectionDeleteModal() {
        this.setState({
            sectionDeleteModal: false,
            deleting: null,
            sectionTitle: '',
            sectionNumber: null,
            sectionText: '',
            memRequiredSection: false,
            memIdsSection: [],
            practiceProblemsIds: [],
            sectionHandout: ''
        })
    }

    closeSectionEditModal() {
        this.setState({
            sectionEditModal: false,
            editing: null,
            sectionTitle: '',
            sectionNumber: null,
            sectionText: '',
            memRequiredSection: false,
            memIdsSection: [],
            practiceProblemsIds: [],
            sectionHandout: ''
        })
    }

    handleSectionTitle(e) {
        this.setState({
            sectionTitle: e
        })
    }

    handleSectionNumber(e) {
        this.setState({
            sectionNumber: e
        })
    }

    handleSectionText(e) {
        this.setState({
            sectionText: e
        })
    }

    handleSectionMemRequired(e) {
        this.setState({
            memRequiredSection: e
        })
    }

    handleSectionMemIds(e) {
        this.setState({
            memIdsSection: e
        })
    }

    handlePracticeProblemIds(e) {
        this.setState({
            practiceProblemsIds: e
        })
    }

    handleSectionPDF() {
        let _this = this;
        window.cloudinary.openUploadWidget({ cloud_name: 'symplit', upload_preset: 'rg7skvww' },
            function (error, result) {
                for (var i = result[0].path.length - 1; i > 0; i--) {
                    if (result[0].path[i] === '/') {
                        break;
                    }
                    _this.setState({
                        sectionHandout: result[0].path.slice(i)
                    })
                }
            }
        );
    }

    addSection() {

        let body = {
            section_number: this.state.sectionNumber,
            section_title: this.state.sectionTitle,
            chapter_id: this.props.match.params.chapter,
            section_text: this.state.sectionText,
            membership_required_section: this.state.memRequiredSection,
            membership_ids: this.state.memIdsSection,
            problem_ids: this.state.practiceProblemsIds,
            section_handout: this.state.sectionHandout
        }

        axios.post('/api/sections', body).then(section => {
            this.setState({
                addSectionModal: false,
                sectionTitle: '',
                sectionNumber: null,
                sectionText: '',
                memRequiredSection: false,
                memIdsSection: [],
                practiceProblemsIds: [],
                sectionHandout: ''
            })

            let chapterId = this.props.match.params.chapter
            let bookId = this.props.match.params.book
            let sections = axios.get('/api/sections/' + chapterId);
            let chapter = axios.get('/api/chapter/' + chapterId);
            let book = axios.get('/api/books/' + bookId);
            let chapSections = axios.get('/api/chapsections/' + chapterId);
            let videos = axios.get('/api/videos')

            axios.all([sections, chapter, book, chapSections, videos]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data,
                    chapSections: res[3].data,
                    videos: res[4].data
                })
            })
        })
    }

    updateSection() {

        let body = {
            section_number: this.state.sectionNumber,
            section_title: this.state.sectionTitle,
            chapter_id: this.props.match.params.chapter,
            section_text: this.state.sectionText,
            membership_required_section: this.state.memRequiredSection,
            membership_ids: this.state.memIdsSection,
            problem_ids: this.state.practiceProblemsIds,
            section_handout: this.state.sectionHandout
        }

        axios.put('/api/sections/' + this.state.editing + '/' + this.props.match.params.chapter, body).then(section => {
            this.setState({
                addSectionModal: false,
                sectionTitle: '',
                sectionNumber: null,
                sectionText: '',
                memRequiredSection: false,
                memIdsSection: [],
                practiceProblemsIds: [],
                sectionHandout: ''
            })

            let chapterId = this.props.match.params.chapter
            let bookId = this.props.match.params.book
            let sections = axios.get('/api/sections/' + chapterId);
            let chapter = axios.get('/api/chapter/' + chapterId);
            let book = axios.get('/api/books/' + bookId);
            let chapSections = axios.get('/api/chapsections/' + chapterId);
            let videos = axios.get('/api/videos')

            axios.all([sections, chapter, book, chapSections, videos]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data,
                    chapSections: res[3].data,
                    videos: res[4].data
                })
            })
        })
    }

    deleteSection() {
        axios.delete('/api/sections/' + this.state.deleting + '/' + this.props.match.params.chapter).then(deleted => {
            this.setState({
                sectionDeleteModal: false
            })

            let chapterId = this.props.match.params.chapter
            let bookId = this.props.match.params.book
            let sections = axios.get('/api/sections/' + chapterId);
            let chapter = axios.get('/api/chapter/' + chapterId);
            let book = axios.get('/api/books/' + bookId);
            let chapSections = axios.get('/api/chapsections/' + chapterId);
            let videos = axios.get('/api/videos')

            axios.all([sections, chapter, book, chapSections, videos]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data,
                    chapSections: res[3].data,
                    videos: res[4].data
                })
            })
        })
    }

    openVideoAddModal(e) {
        this.setState({
            videoAddModal: true,
            sectionParam: e
        })
    }

    closeVideoAddModal() {
        this.setState({
            videoAddModal: false,
            sectionParam: null
        })
    }

    handleSectionVideoTitle(e) {
        this.setState({
            sectionVideoTitle: e
        })
    }

    handleSectionVideoText(e) {
        this.setState({
            sectionVideoText: e
        })
    }

    openVideosModal() {
        this.setState({
            videosModal: true
        })
    }

    closeVideosModal() {
        this.setState({
            videosModal: false
        })
    }

    handleSectionVideoMemRequired(e) {
        this.setState({
            memRequiredVideo: e
        })
    }

    handleSectionVideoMemIds(e) {
        this.setState({
            memIdsVideo: e
        })
    }

    handleSectionVideoPDF() {
        let _this = this;
        window.cloudinary.openUploadWidget({ cloud_name: 'symplit', upload_preset: 'rg7skvww' },
            function (error, result) {
                for (var i = result[0].path.length - 1; i > 0; i--) {
                    if (result[0].path[i] === '/') {
                        break;
                    }
                    _this.setState({
                        sectionVideoHandout: result[0].path.slice(i)
                    })
                }
            }
        );
    }

    addSectionVideo() {

        let body = {
            section_id: this.state.sectionParam,
            video_id: this.state.sectionVideo.video_id ? this.state.sectionVideo.video_id : null,
            sectionvideo_title: this.state.sectionVideoTitle,
            sectionvideo_text: this.state.sectionVideoText,
            membership_required_video: this.state.memRequiredVideo,
            membership_ids: this.state.memIdsVideo,
            sectionvideo_handout: this.state.sectionVideoHandout
        }

        axios.post('/api/sectionvideos', body).then(newVideo => {
            let chapterId = this.props.match.params.chapter
            let bookId = this.props.match.params.book
            let sections = axios.get('/api/sections/' + chapterId);
            let chapter = axios.get('/api/chapter/' + chapterId);
            let book = axios.get('/api/books/' + bookId);
            let chapSections = axios.get('/api/chapsections/' + chapterId);
            let videos = axios.get('/api/videos')

            axios.all([sections, chapter, book, chapSections, videos]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data,
                    chapSections: res[3].data,
                    videos: res[4].data,
                    videoAddModal: false,
                    sectionParam: null,
                    sectionVideo: {},
                    sectionVideoTitle: '',
                    sectionVideoText: '',
                    memRequiredVideo: false,
                    memIdsVideo: '',
                    sectionVideoHandout: ''
                })
            })
        })
    }

    selectVideo(e) {
        this.setState({
            sectionVideo: e,
            videosModal: false
        })
    }

    vimeoModal() {
        this.setState({
            vimeoModal: true
        })
    }

    closeVimeoModal() {
        this.setState({
            vimeoModal: false
        })
    }

    handleVimeoVideoTitle(e) {
        this.setState({
            vimeoVideoTitle: e
        })
    }

    handleVimeoVideoUrl(e) {
        this.setState({
            vimeoVideoUrl: e
        })
    }

    addVimeoLink() {

        let body = {
            video_title: this.state.vimeoVideoTitle,
            video_url: this.state.vimeoVideoUrl
        }

        axios.post('/api/videos', body).then(newVideo => {
            axios.get('/api/videos').then(videos => {
                this.setState({
                    vimeoModal: false,
                    videos: videos.data,
                    vimeoVideoTitle: '',
                    vimeoVideoUrl: ''
                })
            })
        })
    }

    vimeoEditModal(e) {
        axios.get('/api/video/' + e).then(video => {
            console.log(video.data);
            this.setState({
                vimeoEditModal: true,
                editing: e,
                vimeoVideoTitle: video.data[0].video_title,
                vimeoVideoUrl: video.data[0].video_url
            })
        })
    }

    closeVimeoEditModal() {
        this.setState({
            vimeoEditModal: false,
            editing: null
        })
    }

    vimeoDeleteModal(e) {
        this.setState({
            vimeoDeleteModal: true,
            deleting: e
        })
    }

    closeVimeoDeleteModal() {
        this.setState({
            vimeoDeleteModal: false,
            deleting: null
        })
    }

    //comment for testing purposes
    vimeoEdit() {

        let body = {
            video_title: this.state.vimeoVideoTitle,
            video_url: this.state.vimeoVideoUrl
        }

        axios.put('/api/videos/' + this.state.editing, body).then(updated => {
            axios.get('/api/videos').then(videos => {
                this.setState({
                    vimeoEditModal: false,
                    editing: null,
                    vimeoVideoTitle: '',
                    vimeoVideoUrl: '',
                    videos: videos.data
                })
            })
        })

    }

    vimeoDelete() {
        axios.delete('/api/videos/' + this.state.deleting).then(deleted => {
            axios.get('/api/videos').then(videos => {
                this.setState({
                    vimeoDeleteModal: false,
                    deleting: null,
                    videos: videos.data
                })
            })
        })
    }

    videoEditModal(e) {
        axios.get('/api/sectionvideo/' + e).then(res => {
            axios.get('/api/video/' + res.data[0].video_id).then(resp => {
                this.setState({
                    sectionVideo: resp.data[0]
                })
            })
            this.setState({
                videoEditModal: true,
                editing: e,
                sectionVideoTitle: res.data[0].section_video_title,
                sectionVideoText: res.data[0].section_video_text,
                memRequiredVideo: res.data[0].membership_required_video,
                memIdsVideo: res.data[0].membership_ids,
                sectionVideoHandout: res.data[0].section_video_handout
            })
        })
    }

    closeVideoEditModal() {
        this.setState({
            videoEditModal: false,
            editing: null,
            sectionVideoTitle: '',
            sectionVideoText: '',
            memRequiredVideo: false,
            memIdsVideo: '',
            sectionVideoHandout: '',
            secionVideo: {}
        })
    }

    videoDeleteModal(e) {
        this.setState({
            videoDeleteModal: true,
            deleting: e
        })
    }

    closeVideoDeleteModal() {
        this.setState({
            videoDeleteModal: false,
            deleting: null
        })
    }

    editSectionVideo() {

        let body = {
            video_id: this.state.sectionVideo.video_id ? this.state.sectionVideo.video_id : null,
            sectionvideo_title: this.state.sectionVideoTitle,
            sectionvideo_text: this.state.sectionVideoText,
            membership_required_video: this.state.memRequiredVideo,
            membership_ids: this.state.memIdsVideo,
            sectionvideo_handout: this.state.sectionVideoHandout
        }

        axios.put('/api/sectionvideos/' + this.state.editing, body).then(res => {

            let chapterId = this.props.match.params.chapter
            let bookId = this.props.match.params.book
            let sections = axios.get('/api/sections/' + chapterId);
            let chapter = axios.get('/api/chapter/' + chapterId);
            let book = axios.get('/api/books/' + bookId);
            let chapSections = axios.get('/api/chapsections/' + chapterId);
            let videos = axios.get('/api/videos')

            axios.all([sections, chapter, book, chapSections, videos]).then(resp => {
                this.setState({
                    sections: resp[0].data,
                    chapter: resp[1].data,
                    book: resp[2].data,
                    chapSections: resp[3].data,
                    videos: resp[4].data,
                    videoEditModal: false,
                    editing: null,
                    sectionVideoTitle: '',
                    sectionVideoText: '',
                    memRequiredVideo: false,
                    memIdsVideo: '',
                    sectionVideoHandout: '',
                    sectionVideo: {}
                })
            })
        })
    }

    deleteSectionVideo() {
        axios.delete('/api/sectionvideos/'+this.state.deleting).then(deleted => {

            let chapterId = this.props.match.params.chapter
            let bookId = this.props.match.params.book
            let sections = axios.get('/api/sections/' + chapterId);
            let chapter = axios.get('/api/chapter/' + chapterId);
            let book = axios.get('/api/books/' + bookId);
            let chapSections = axios.get('/api/chapsections/' + chapterId);
            let videos = axios.get('/api/videos')

            axios.all([sections, chapter, book, chapSections, videos]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data,
                    chapSections: res[3].data,
                    videos: res[4].data,
                    deleting: null,
                    videoDeleteModal: false
                })
            })
        })
    }

    render() {

        let adminAddSection = !this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openAddSectionModal()}>Add Section</button>
        let book = this.state.book.length > 0 ?
            <div>
                <Link to={`/book/${this.state.book[0].book_id}`} className="bookcrumb">
                    <img src={`http://res.cloudinary.com/symplit/image/upload/${this.state.book[0].book_image}`} alt="Back to Book" className="bookcrumbimg" />
                    <div>{this.state.book[0].book_title}</div>
                </Link>
                <div className="navchaptertitle">{this.state.chapter[0].book_chapter}. {this.state.chapter[0].chapter_title}</div>
                {adminAddSection}
            </div> : null;

        let videosMap = this.state.videos.length > 0 ? this.state.videos.map((e, i) => {
            return (
                <div >
                    <h1>{e.video_title}</h1>
                    <button onClick={() => this.vimeoEditModal(e.video_id)}>Edit</button><button onClick={() => this.vimeoDeleteModal(e.video_id)}>Delete</button>
                    <button onClick={() => this.selectVideo(e)}>Select</button>
                </div>
            )
        }) : null;


        let navMap = this.state.sections.length > 0 ? this.state.sections.map((e, i) => {
            let videoMap = e.sectionVideos.map((x, y) => {
                return (
                    <a href={`#${x.sectionVideoTitle}`} key={x.sectionVideoId}>
                        <li className="videolistitem">
                            {x.sectionVideoTitle}
                        </li>
                    </a>
                )
            })
            return (
                <div key={e.sectionTitle}>
                    <a href={`#${e.sectionTitle}`} ><div className="sectiontitle">{this.props.match.params.chapter}.{e.sectionNumber} {e.sectionTitle}</div></a>
                    <ul className="videolist">
                        {videoMap}
                    </ul>
                </div>
            )
        }) : null

        let bodyMap = this.state.sections.length > 0 ? this.state.sections.map((e, i) => {
            let bodyVideoMap = e.sectionVideos.map((x, y) => {
                return (
                    <a name={x.sectionVideoTitle} key={x.sectionVideoId}>
                        <div className="videotile" >
                            <div className="videotitle">{x.sectionVideoTitle}</div>
                            {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.videoEditModal(x.sectionVideoId)}>Edit Video</button>}
                            {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.videoDeleteModal(x.sectionVideoId)}>Delete Video</button>}
                            <div className="videobody">
                                <ReactPlayer
                                    url={x.videoUrl}
                                    style={videoStyle}
                                    className="reactplayer"
                                />
                                <div className="videodesc">
                                    <div>{x.sectionVideoText}</div>
                                    {/* <div><button></button></div> */}
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })
            return (
                <a name={e.sectionTitle} key={e.sectionTitle} className="sectionbodycontainer">
                    <div className="bodysectiontitle">{this.props.match.params.chapter}.{e.sectionNumber} {e.sectionTitle}</div>
                    <div className="adminbuttoncontainer">
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openVideoAddModal(e.sectionNumber)}>Add Video</button>}
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openSectionEditModal(e.sectionNumber)}>Edit Section</button>}
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openSectionDeleteModal(e.sectionNumber)}>Delete Section</button>}
                    </div>
                    <div className="bodyvideocontainer">
                        {bodyVideoMap}
                    </div>
                </a>
            )
        }) : null

        return (
            <div className="singlechapterbody">
                <div className="booknavcontainer">
                    {book}
                    {navMap}
                </div>
                <div className="singlechaptercontent">
                    {bodyMap}

                    <Modal isOpen={this.state.addSectionModal} onRequestClose={this.closeAddSectionModal} style={addStyles}>
                        <button onClick={this.closeAddSectionModal}>Close</button>
                        <div className="checkboxfield">
                            Section Title: <input placeholder="Section Title" value={this.state.sectionTitle} onChange={(e) => this.handleSectionTitle(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Section Number: <input placeholder="Section Number" value={this.state.sectionNumber} onChange={(e) => this.handleSectionNumber(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Section Summary: <input placeholder="Section Summary" value={this.state.sectionText} onChange={(e) => this.handleSectionText(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Is Membership Required? <input value={this.state.memRequiredSection} onChange={(e) => this.handleSectionMemRequired(e.target.checked)} type="checkbox" />
                        </div>
                        <div className="checkboxfield">
                            Membership IDs: <input placeholder="Section Membership IDs" value={this.state.memIdsSection} onChange={(e) => this.handleSectionMemIds(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Practice Problem IDs: <input placeholder="Practice Problem IDs" value={this.state.practiceProblemsIds} onChange={(e) => this.handlePracticeProblemIds(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Upload Section Handout: <button className="upload-button" onClick={this.handleSectionPDF}>Add PDF</button>
                        </div>
                        <p>Current PDF: {this.state.sectionHandout}</p>
                        <button onClick={() => this.addSection()}>Submit</button>
                    </Modal>

                    <Modal isOpen={this.state.sectionEditModal} onRequestClose={this.closeSectionEditModal} style={addStyles}>
                        <button onClick={this.closeSectionEditModal}>Close</button>
                        <div className="checkboxfield">
                            Section Title: <input placeholder="Section Title" value={this.state.sectionTitle} onChange={(e) => this.handleSectionTitle(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Section Number: <input placeholder="Section Number" value={this.state.sectionNumber} onChange={(e) => this.handleSectionNumber(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Section Summary: <input placeholder="Section Summary" value={this.state.sectionText} onChange={(e) => this.handleSectionText(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Is Membership Required? <input value={this.state.memRequiredSection} onChange={(e) => this.handleSectionMemRequired(e.target.checked)} type="checkbox" />
                        </div>
                        <div className="checkboxfield">
                            Membership IDs: <input placeholder="Section Membership IDs" value={this.state.memIdsSection} onChange={(e) => this.handleSectionMemIds(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Practice Problem IDs: <input placeholder="Practice Problem IDs" value={this.state.practiceProblemsIds} onChange={(e) => this.handlePracticeProblemIds(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Upload Section Handout: <button className="upload-button" onClick={this.handleSectionPDF}>Add PDF</button>
                        </div>
                        <p>Current PDF: {this.state.sectionHandout}</p>
                        <button onClick={() => this.updateSection()}>Submit</button>
                    </Modal>

                    <Modal isOpen={this.state.sectionDeleteModal} onRequestClose={this.closeSectionDeleteModal} style={addStyles}>
                        <button onClick={this.closeSectionDeleteModal}>Close</button>
                        <div>Are you sure you want to delete this?</div>
                        <button onClick={() => this.deleteSection()}>Delete</button>
                    </Modal>

                    <Modal isOpen={this.state.videoAddModal} onRequestClose={this.closeVideoAddModal} style={addStyles}>
                        <button onClick={this.closeVideoAddModal}>Close</button>
                        <div className="checkboxfield">
                            Section Video Title: <input placeholder="Section Video Title" value={this.state.sectionVideoTitle} onChange={(e) => this.handleSectionVideoTitle(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Section Video Text: <input placeholder="Section Video Text" value={this.state.sectionVideoText} onChange={(e) => this.handleSectionVideoText(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Add a video: <button onClick={this.openVideosModal}>Add</button>
                        </div>
                        <p>Current Video: {this.state.sectionVideo.video_title ? this.state.sectionVideo.video_title : null}</p>
                        <div className="checkboxfield">
                            Is Membership Required? <input value={this.state.memRequiredVideo} onChange={(e) => this.handleSectionVideoMemRequired(e.target.checked)} type="checkbox" />
                        </div>
                        <div className="checkboxfield">
                            Membership IDs: <input placeholder="Video Membership IDs" value={this.state.memIdsVideo} onChange={(e) => this.handleSectionVideoMemIds(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Upload Video Handout: <button className="upload-button" onClick={this.handleSectionVideoPDF}>Add PDF</button>
                        </div>
                        <p>Current PDF: {this.state.sectionVideoHandout}</p>
                        <button onClick={this.addSectionVideo}>Submit</button>
                    </Modal>

                    <Modal isOpen={this.state.videoEditModal} onRequestClose={this.closeVideoEditModal} style={addStyles}>
                        <button onClick={this.closeVideoEditModal}>Close</button>
                        <div className="checkboxfield">
                            Section Video Title: <input placeholder="Section Video Title" value={this.state.sectionVideoTitle} onChange={(e) => this.handleSectionVideoTitle(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Section Video Text: <input placeholder="Section Video Text" value={this.state.sectionVideoText} onChange={(e) => this.handleSectionVideoText(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Choose a different video: <button onClick={this.openVideosModal}>Choose</button>
                        </div>
                        <p>Current Video: {this.state.sectionVideo.video_title ? this.state.sectionVideo.video_title : null}</p>
                        <div className="checkboxfield">
                            Is Membership Required? <input value={this.state.memRequiredVideo} onChange={(e) => this.handleSectionVideoMemRequired(e.target.checked)} type="checkbox" />
                        </div>
                        <div className="checkboxfield">
                            Membership IDs: <input placeholder="Video Membership IDs" value={this.state.memIdsVideo} onChange={(e) => this.handleSectionVideoMemIds(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Upload Video Handout: <button className="upload-button" onClick={this.handleSectionVideoPDF}>Add PDF</button>
                        </div>
                        <p>Current PDF: {this.state.sectionVideoHandout}</p>
                        <button onClick={this.editSectionVideo}>Submit</button>
                    </Modal>

                    <Modal isOpen={this.state.videoDeleteModal} onRequestClose={this.closeVideoDeleteModal} style={addStyles}>
                        <button onClick={this.closeVideoDeleteModal}>Close</button>
                        <p>Are you sure you want to delete this?</p>
                        <button onClick={this.deleteSectionVideo}>Delete</button>
                    </Modal>

                    <Modal isOpen={this.state.videosModal} onRequestClose={this.closeVideosModal} style={addStyles}>
                        <button onClick={this.closeVideosModal}>Close</button>
                        {videosMap}
                        <button onClick={this.vimeoModal}>New Vimeo Link</button>
                    </Modal>

                    <Modal isOpen={this.state.vimeoModal} onRequestClose={this.closeVimeoModal} style={addStyles}>
                        <button onClick={this.closeVimeoModal}>Close</button>
                        <div className="checkboxfield">
                            Vimeo Video Title: <input placeholder="Vimeo Video Title" value={this.state.vimeoVideoTitle} onChange={(e) => this.handleVimeoVideoTitle(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Vimeo Video URL: <input placeholder="Vimeo Video URL" value={this.state.vimeoVideoUrl} onChange={(e) => this.handleVimeoVideoUrl(e.target.value)} type="text" />
                        </div>
                        <button onClick={this.addVimeoLink}>Submit</button>
                    </Modal>

                    <Modal isOpen={this.state.vimeoEditModal} onRequestClose={this.closeVimeoEditModal} style={addStyles}>
                        <button onClick={this.closeVimeoEditModal}>Close</button>
                        <div className="checkboxfield">
                            Vimeo Video Title: <input placeholder="Vimeo Video Title" value={this.state.vimeoVideoTitle} onChange={(e) => this.handleVimeoVideoTitle(e.target.value)} type="text" />
                        </div>
                        <div className="checkboxfield">
                            Vimeo Video URL: <input placeholder="Vimeo Video URL" value={this.state.vimeoVideoUrl} onChange={(e) => this.handleVimeoVideoUrl(e.target.value)} type="text" />
                        </div>
                        <button onClick={this.vimeoEdit}>Submit</button>
                    </Modal>

                    <Modal isOpen={this.state.vimeoDeleteModal} onRequestClose={this.closeVimeoDeleteModal} style={addStyles}>
                        <button onClick={this.closeVimeoDeleteModal}>Close</button>
                        <p>Are you sure you want to delete this from the database?</p>
                        <button onClick={this.vimeoDelete}>Delete</button>
                    </Modal>


                    <Footer />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(SingleChapter)