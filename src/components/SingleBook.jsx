import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { getUserInfo, getPath } from '../ducks/reducer';
import { connect } from 'react-redux';
import Modal from 'react-modal';

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

class SingleBook extends Component {
    constructor() {
        super();

        this.state = {
            book: [],
            bookTitle: '',
            bookSubtitle: '',
            bookImage: '',
            bookSubject: '',
            bookAuthor: [],
            bookMemRequired: false,
            bookMemIds: [],
            bookVisible: false,
            chapterTitle: '',
            chapterText: '',
            bookChapter: '',
            chapterMemRequired: false,
            chapterMemIds: [],
            savedbooks: [],
            practiceProblems: [],
            completedProblems: []
        }
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleSubtitle = this.handleSubtitle.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleMemRequired = this.handleMemRequired.bind(this);
        this.handleMemIds = this.handleMemIds.bind(this);
        this.handleVisible = this.handleVisible.bind(this);
        this.addChapter = this.addChapter.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.openChapEditModal = this.openChapEditModal.bind(this);
        this.closeChapEditModal = this.closeChapEditModal.bind(this);
        this.openChapDeleteModal = this.openChapDeleteModal.bind(this);
        this.closeChapDeleteModal = this.closeChapDeleteModal.bind(this);
        this.handleChapTitle = this.handleChapTitle.bind(this);
        this.handleChapText = this.handleChapText.bind(this);
        this.handleBookChap = this.handleBookChap.bind(this);
        this.handleChapMemRequired = this.handleChapMemRequired.bind(this);
        this.handleChapMemIds = this.handleChapMemIds.bind(this);
        this.updateChap = this.updateChap.bind(this);
        this.deleteChap = this.deleteChap.bind(this);
        this.addToSaved = this.addToSaved.bind(this);
        this.removeFromSaved = this.removeFromSaved.bind(this);
    }

    componentDidMount() {
        this.props.getUserInfo();
        this.props.getPath(this.props.location.pathname);
        let bookId = this.props.match.params.book;
        let book = axios.get('/api/books/' + bookId)
        let savedbooks = axios.get('/api/savedbooks')
        let practiceProblems = axios.get('/api/problems/' + bookId)
        let completedProblems = axios.get('/api/completedproblems')
        axios.all([book, savedbooks, practiceProblems, completedProblems]).then(res => {
            this.setState({
                book: res[0].data,
                savedbooks: res[1].data,
                practiceProblems: res[2].data,
                completedProblems: res[3].data
            })
        })
        Modal.setAppElement('body');
    }

    openChapDeleteModal(i) {
        this.setState({
            chapDeleteModal: true,
            deleting: i
        })
    }

    openChapEditModal(i) {
        axios.get('/api/chapter/' + i).then(chapter => {
            this.setState({
                chapEditModal: true,
                editing: i,
                chapterTitle: chapter.data[0].chapter_title,
                chapterText: chapter.data[0].chapter_text,
                bookChapter: chapter.data[0].book_chapter,
                chapterMemRequired: chapter.data[0].membership_required_chapter,
                chapterMemIds: chapter.data[0].membership_ids_chapter
            })
        })
    }

    closeChapDeleteModal() {
        this.setState({
            chapDeleteModal: false,
            deleting: null,
            chapterTitle: '',
            chapterText: '',
            chapterMemRequired: false,
            chapterMemIds: []
        })
    }

    handleBookChap(e) {
        this.setState({
            bookChapter: e
        })
    }

    handleChapMemIds(e) {
        this.setState({
            chapterMemIds: e
        })
    }

    handleChapMemRequired(e) {
        this.setState({
            chapterMemRequired: e
        })
    }

    handleChapText(e) {
        this.setState({
            chapterText: e
        })
    }

    handleChapTitle(e) {
        this.setState({
            chapterTitle: e
        })
    }

    closeChapEditModal() {
        this.setState({
            chapEditModal: false,
            editing: null,
            chapterTitle: '',
            chapterText: '',
            chapterMemRequired: false,
            chapterMemIds: []
        })
    }

    updateChap() {

        let body = {
            book_id: this.props.match.params.book,
            chapter_title: this.state.chapterTitle,
            chapter_text: this.state.chapterText,
            membership_required_chapter: this.state.chapterMemRequired,
            membership_ids_chapter: this.state.chapterMemIds,
            book_chapter: this.state.bookChapter
        }

        axios.put('/api/chapters/' + this.state.editing, body).then(chapter => {
            this.setState({
                chapEditModal: false,
                chapterTitle: '',
                chapterText: '',
                chapterMemRequired: false,
                chapterMemIds: []
            })

            let bookId = this.props.match.params.book;
            axios.get('/api/books/' + bookId).then(book => {
                this.setState({
                    book: book.data
                })
            })
        })
    }

    deleteChap() {
        axios.delete('/api/chapters/' + this.state.deleting).then(deleted => {
            this.setState({
                chapDeleteModal: false
            })

            let bookId = this.props.match.params.book;
            axios.get('/api/books/' + bookId).then(book => {
                this.setState({
                    book: book.data
                })
            })
        })
    }

    openAddModal() {
        this.setState({
            addModal: true
        })
    }

    closeAddModal() {
        this.setState({
            addModal: false,
            chapterTitle: '',
            chapterText: '',
            chapterMemRequired: false,
            chapterMemIds: []
        })
    }

    openEditModal(i) {
        axios.get('/api/books/' + i).then(book => {
            this.setState({
                editModal: true,
                editing: i,
                bookTitle: book.data[0].book_title,
                bookSubtitle: book.data[0].book_subtitle,
                bookImage: book.data[0].book_image,
                bookSubject: book.data[0].book_subject,
                bookAuthor: book.data[0].author,
                bookMemRequired: book.data[0].membership_required_book,
                bookMemIds: book.data[0].membership_ids_book,
                bookVisible: book.data[0].visible
            })
        })
    }

    closeEditModal() {
        this.setState({
            editModal: false,
            editing: null,
            bookTitle: '',
            bookSubtitle: '',
            bookImage: '',
            bookSubject: '',
            bookAuthor: [],
            bookMemRequired: false,
            bookMemIds: [],
            bookVisible: false
        })
    }

    openDeleteModal(i) {
        this.setState({
            deleteModal: true,
            deleting: i,
            bookTitle: '',
            bookSubtitle: '',
            bookImage: '',
            bookSubject: '',
            bookAuthor: [],
            bookMemRequired: false,
            bookMemIds: [],
            bookVisible: false
        })
    }

    closeDeleteModal() {
        this.setState({
            deleteModal: false,
            deleting: null
        })
    }

    handleTitle(e) {
        this.setState({
            bookTitle: e
        })
    }

    handleSubtitle(e) {
        this.setState({
            bookSubtitle: e
        })
    }

    handleImage() {
        let _this = this;
        window.cloudinary.openUploadWidget({ cloud_name: 'symplit', upload_preset: 'rg7skvww' },
            function (error, result) {
                for (var i = result[0].path.length - 1; i > 0; i--) {
                    if (result[0].path[i] === '/') {
                        break;
                    }
                    _this.setState({
                        bookImage: result[0].path.slice(i)
                    })
                }
            });
    }

    handleSubject(e) {
        this.setState({
            bookSubject: e
        })
    }

    handleAuthor(e) {
        this.setState({
            bookAuthor: e
        })
    }

    handleMemRequired(e) {
        this.setState({
            bookMemRequired: e
        })
    }

    handleMemIds(e) {
        this.setState({
            bookMemIds: e
        })
    }

    handleVisible(e) {
        this.setState({
            bookVisible: e
        })
    }


    updateBook() {

        let body = {
            book_title: this.state.bookTitle,
            book_subtitle: this.state.bookSubtitle,
            book_image: this.state.bookImage,
            book_subject: this.state.bookSubject,
            author: this.state.bookAuthor,
            membership_required_book: this.state.bookMemRequired,
            membership_ids_book: this.state.bookMemIds,
            visible: this.state.bookVisible
        }

        axios.put('/api/books/' + this.state.editing, body).then(book => {
            this.setState({
                editModal: false,
                bookTitle: '',
                bookSubtitle: '',
                bookImage: '',
                bookSubject: '',
                bookAuthor: [],
                bookMemRequired: false,
                bookMemIds: [],
                bookVisible: false
            })

            let bookId = this.props.match.params.book;
            axios.get('/api/books/' + bookId).then(book => {
                this.setState({
                    book: book.data
                })
            })
        })
    }

    deleteBook() {
        axios.delete('/api/books/' + this.state.deleting).then(deleted => {
            this.setState({
                deleteModal: false
            })
        })
    }

    addChapter() {

        let body = {
            book_id: this.props.match.params.book,
            book_chapter: this.state.bookChapter,
            chapter_title: this.state.chapterTitle,
            chapter_text: this.state.chapterText,
            membership_required_chapter: this.state.chapterMemRequired,
            membership_ids: this.state.chapterMemIds
        }

        axios.post('/api/chapters', body).then(chapter => {
            this.setState({
                addModal: false,
                bookChapter: null,
                chapterTitle: '',
                chapterText: '',
                chapterMemRequired: false,
                chapterMemIds: []
            })

            let bookId = this.props.match.params.book;
            axios.get('/api/books/' + bookId).then(book => {
                this.setState({
                    book: book.data
                })
            })
        })
    }

    addToSaved() {
        axios.post('/api/savedbooks', { book_id: this.state.book[0].book_id }).then(books => {
            this.setState({
                savedbooks: books.data
            })
        })
    }

    removeFromSaved() {
        axios.delete('/api/savedbooks/' + this.state.book[0].book_id).then(books => {
            this.setState({
                savedbooks: books.data
            })
        })
    }

    render() {

        let adminaddChapter = !this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openAddModal()}>Add Chapter</button>
        let chapters = this.state.book.length > 0 ? this.state.book[0].chapters : null;

        let chapterList = chapters ? chapters.map((e, i) => {
            return (
                <div className="chaptercontainer" key={i}>
                    <Link to={`/book/${this.props.match.params.book}/${e.chapter_id}`} key={i} className="chaptertile">
                        <div className="chapternumber">CHAPTER {e.book_chapter}</div>
                        <div className="chaptertitle">{e.chapter_title}</div>
                    </Link>
                    <div className="adminbuttoncontainer">
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openChapEditModal(e.chapter_id)}>Edit</button>}
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openChapDeleteModal(e.chapter_id)}>Delete</button>}
                    </div>
                </div>
            )
        }) : null

        let bookImg = this.state.book.length > 0 ? `http://res.cloudinary.com/symplit/image/upload/${this.state.book[0].book_image}` : null;
        let bookTitle = this.state.book.length > 0 ? this.state.book[0].book_title : null;
        let bookSubTitle = this.state.book.length > 0 ? this.state.book[0].book_subtitle : null;
        let bookAuthor = this.state.book.length > 0 ? this.state.book[0].author.map((e, i) => {
            return (
                <div key={i}>{e}</div>
            )
        }) : null;

        let savedBooksExist = false;
        if (this.state.savedbooks.length > 0 && this.state.book[0]) {
            for (let i = 0; i < this.state.savedbooks.length; i++) {
                if (this.state.book[0].book_id === this.state.savedbooks[i].book_id) {
                    savedBooksExist = true;
                }
            }
        }

        let addRemoveButton = !this.props.user.user_id ? null : savedBooksExist ? <button className="savedbookbutton" onClick={this.removeFromSaved}>Remove from Saved Books</button> : <button className="savedbookbutton" onClick={this.addToSaved}>Add to Saved Books</button>

        let practiceMap = this.state.practiceProblems.length === 0 ? null : this.state.practiceProblems.map((e, i) => {
            let completed = typeof this.state.completedProblems === 'object' ? this.state.completedProblems.map((x, y) => {
                let count = 0;
                if (x.section_id === e.sectionId) {
                    for(let i = 0; i<e.practiceProblems.length; i++){
                        if(e.practiceProblems[i].problem_id === x.problem_id){
                            count++;
                        }
                    }
                    return count
                }
                return count
            }) : 0
            let completedTotal = typeof completed === 'object' ? completed.reduce((a,b) => a+b) : 0;
            let tileClass = completedTotal === e.practiceProblems.length ? 'practicedone' : 'practicetile';
            return (
                <div className={tileClass} key={e.sectionTitle}>
                    <div className="practicetilehead">{e.chapter}.{e.sectionNumber}</div>
                    <div className="practicetilecomplete">
                        <div className="practicetilecompletenumber">{completedTotal}/{e.practiceProblems.length}</div>
                        <div>Completed</div>
                    </div>
                </div>
            )
        })

        return (
            <div className="singlebookbody">
                <div className="bookoverview">
                    <img src={bookImg} alt="Book" className="singlebookimage" />
                    <div className="booksummary">
                        <h1>{bookTitle}</h1>
                        <h2>{bookSubTitle}</h2>
                        <h3>{bookAuthor}</h3>
                        {addRemoveButton}
                        <div className="adminbuttoncontainer">
                            {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openEditModal(this.state.book[0].book_id)}>Edit</button>}
                            {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openDeleteModal(this.state.book[0].book_id)}>Delete</button>}
                        </div>
                    </div>
                </div>
                <div className="singlebookcontent">
                    <div className="chapterlist">
                        <h1>STUDY</h1>
                        {adminaddChapter}
                        <div className="chaptergrid">
                            {chapterList}
                        </div>
                    </div>
                    <div className="practicelist">
                        <h1>PRACTICE</h1>
                        <div className="practicegrid">
                            {practiceMap}
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.addModal} onRequestClose={this.closeAddModal} style={addStyles}>
                    <button onClick={this.closeAddModal}>Close</button>
                    <div className="checkboxfield">
                        Chapter Title: <input placeholder="Chapter Title" value={this.state.chapterTitle} onChange={(e) => this.handleChapTitle(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Chapter Number: <input placeholder="Chapter Number" value={this.state.bookChapter} onChange={(e) => this.handleBookChap(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Chapter Summary: <input placeholder="Chapter Summary" value={this.state.chapterText} onChange={(e) => this.handleChapText(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Is Membership Required? <input type="checkbox" defaultChecked={this.state.chapterMemRequired} onChange={(e) => this.handleChapMemRequired(e.target.checked)}></input>
                    </div>
                    <div className="checkboxfield">
                        Membership IDs: <input placeholder="Chapter Membership IDs" value={this.state.chapterMemIds} onChange={(e) => this.handleChapMemIds(e.target.value)}></input>
                    </div>
                    <button onClick={() => this.addChapter()}>Submit</button>
                </Modal>

                <Modal isOpen={this.state.chapEditModal} onRequestClose={this.closeChapEditModal} style={addStyles}>
                    <button onClick={this.closeChapEditModal}>Close</button>
                    <div className="checkboxfield">
                        Chapter Title: <input placeholder="Chapter Title" value={this.state.chapterTitle} onChange={(e) => this.handleChapTitle(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Chapter Number: <input placeholder="Chapter Number" value={this.state.bookChapter} onChange={(e) => this.handleBookChap(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Chapter Summary: <input placeholder="Chapter Summary" value={this.state.chapterText} onChange={(e) => this.handleChapText(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Is Membership Required? <input type="checkbox" defaultChecked={this.state.chapterMemRequired} onChange={(e) => this.handleChapMemRequired(e.target.checked)}></input>
                    </div>
                    <div className="checkboxfield">
                        Membership IDs: <input placeholder="Chapter Membership IDs" value={this.state.chapterMemIds} onChange={(e) => this.handleChapMemIds(e.target.value)}></input>
                    </div>
                    <button onClick={() => this.updateChap()}>Submit</button>
                </Modal>

                <Modal isOpen={this.state.editModal} onRequestClose={this.closeEditModal} style={addStyles}>
                    <button onClick={this.closeEditModal}>Close</button>
                    <div className="checkboxfield">
                        Title: <input placeholder="Book Title" value={this.state.bookTitle} onChange={(e) => this.handleTitle(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Subtitle: <input placeholder="Book Subtitle" value={this.state.bookSubtitle} onChange={(e) => this.handleSubtitle(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Upload New Image: <button onClick={this.handleImage} className="upload=button">Add Image</button>
                    </div>
                    <p>Current Image: {this.state.bookImage}</p>
                    <div className="checkboxfield">
                        Subject: <input placeholder="Book Subject" value={this.state.bookSubject} onChange={(e) => this.handleSubject(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Author(s): <input placeholder="Book Author" value={this.state.bookAuthor} onChange={(e) => this.handleAuthor(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Is Membership Required? <input type="checkbox" defaultChecked={this.state.bookMemRequired} onChange={(e) => this.handleMemRequired(e.target.checked)}></input>
                    </div>
                    <div className="checkboxfield">
                        Membership IDs: <input placeholder="Book Membership IDs" value={this.state.bookMemIds} onChange={(e) => this.handleMemIds(e.target.value)}></input>
                    </div>
                    <div className="checkboxfield">
                        Is this book Visible yet? <input type="checkbox" defaultChecked={this.state.bookVisible} onChange={(e) => this.handleVisible(e.target.checked)}></input>
                    </div>
                    <button onClick={() => this.updateBook()}>Submit</button>
                </Modal>

                <Modal isOpen={this.state.deleteModal} onRequestClose={this.closeDeleteModal} style={addStyles}>
                    <button onClick={this.closeDeleteModal}>Close</button>
                    <div>Are you sure you want to delete this?</div>
                    <button onClick={() => this.deleteBook()}>Delete</button>
                </Modal>

                <Modal isOpen={this.state.chapDeleteModal} onRequestClose={this.closeChapDeleteModal} style={addStyles}>
                    <button onClick={this.closeChapDeleteModal}>Close</button>
                    <div>Are you sure you want to delete this?</div>
                    <button onClick={() => this.deleteChap()}>Delete</button>
                </Modal>

                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo, getPath })(SingleBook)