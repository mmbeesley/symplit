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
        padding: "25px"
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
            sectionTitle: '',
            sectionNumber: null,
            sectionText: '',
            memRequiredSection: false,
            memIdsSection: [],
            practiceProblemsIds: [],
            sectionHandout: ''
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
    }

    componentDidMount() {
        let chapterId = this.props.match.params.chapter
        let bookId = this.props.match.params.book
        let sections = axios.get('/api/sections/' + chapterId);
        let chapter = axios.get('/api/chapter/' + chapterId);
        let book = axios.get('/api/books/' + bookId);
        let chapSections = axios.get('/api/chapsections/' + chapterId);
        this.props.getUserInfo();

        axios.all([sections, chapter, book, chapSections]).then(res => {
            this.setState({
                sections: res[0].data,
                chapter: res[1].data,
                book: res[2].data,
                chapSections: res[3].data
            })
        })
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
        axios.get('/api/section/' + i).then(section => {
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

            axios.all([sections, chapter, book]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data
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

        axios.put('/api/sections/' + this.state.editing, body).then(section => {
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

            axios.all([sections, chapter, book]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data
                })
            })
        })
    }

    deleteSection() {
        axios.delete('/api/sections/' + this.state.deleting).then(deleted => {
            this.setState({
                sectionDeleteModal: false
            })

            let chapterId = this.props.match.params.chapter
            let bookId = this.props.match.params.book
            let sections = axios.get('/api/sections/' + chapterId);
            let chapter = axios.get('/api/chapter/' + chapterId);
            let book = axios.get('/api/books/' + bookId);

            axios.all([sections, chapter, book]).then(res => {
                this.setState({
                    sections: res[0].data,
                    chapter: res[1].data,
                    book: res[2].data
                })
            })
        })
    }

    render() {

        let book = this.state.book[0];
        let chapter = this.state.chapter[0];

        let adminAddSection = !this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openAddSectionModal()}>Add Section</button>

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
                <div key={e.sectionId}>
                    <Link to={`/book/${book.book_id}`} className="bookcrumb">
                        <img src={`http://res.cloudinary.com/symplit/image/upload/${book.book_image}`} alt="Back to Book" className="bookcrumbimg" />
                        <div>{book.book_title}</div>
                    </Link>
                    <div className="navchaptertitle">{chapter.book_chapter}. {chapter.chapter_title}</div>
                    {adminAddSection}
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
                <a name={e.sectionTitle} key={e.sectionId} className="sectionbodycontainer">
                    <div className="bodysectiontitle">{this.props.match.params.chapter}.{e.sectionNumber} {e.sectionTitle}</div>
                    <div className="adminbuttoncontainer">
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openSectionEditModal(e.sectionId)}>Edit</button>}
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openSectionDeleteModal(e.sectionId)}>Delete</button>}
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