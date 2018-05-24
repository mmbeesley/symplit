import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { connect } from 'react-redux';
import { getUserInfo, getPath } from '../ducks/reducer';
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

class Books extends Component {
    constructor() {
        super();

        this.state = {
            books: [],
            searchInput: '',
            crumbToggle: false,
            bookTitle: '',
            bookSubtitle: '',
            bookImage: '',
            bookSubject: '',
            bookAuthor: [],
            bookMemRequired: false,
            bookMemIds: [],
            bookVisible: false
        }

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleBreadCrumb = this.handleBreadCrumb.bind(this);
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
        this.addBook = this.addBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    componentDidMount() {
        axios.get('/api/books').then(books => {
            this.setState({
                books: books.data
            })
        })
        this.props.getUserInfo();
        this.props.getPath(this.props.location.pathname);
    }

    handleSearchInput(e) {
        this.setState({
            searchInput: e
        })
    }

    handleSearchButton() {
        let search = this.state.searchInput;
        axios.get('/api/books/search?book=' + search).then(books => {
            this.setState({
                books: books.data,
                searchInput: '',
                crumbToggle: true
            })
        })
    }

    handleBreadCrumb() {
        axios.get('/api/books').then(books => {
            this.setState({
                books: books.data,
                crumbToggle: false
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
            deleting: i
        })
    }

    closeDeleteModal() {
        this.setState({
            deleteModal: false,
            deleting: null,
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
            }
        );
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

    addBook() {

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

        axios.post('/api/books', body).then(testimonial => {
            this.setState({
                addModal: false,
                bookTitle: '',
                bookSubtitle: '',
                bookImage: '',
                bookSubject: '',
                bookAuthor: [],
                bookMemRequired: false,
                bookMemIds: [],
                bookVisible: false
            })

            axios.get('/api/books').then(books => {
                this.setState({
                    books: books.data
                })
            })
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

            axios.get('/api/books').then(books => {
                this.setState({
                    books: books.data
                })
            })
        })
    }

    deleteBook() {
        axios.delete('/api/books/' + this.state.deleting).then(deleted => {
            this.setState({
                deleteModal: false
            })

            axios.get('/api/books').then(books => {
                this.setState({
                    books: books.data
                })
            })
        })
    }

    render() {

        let adminAddBook = !this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openAddModal()}>Add Book</button>

        var bookMap = this.state.books.map((e, i) => {
            var authorMap = e.author.length > 0 ? e.author.map((x, y) => {
                return <h3 key={y} className="homebookauthor">{x}</h3>
            }) : null

            let imageUrl = `http://res.cloudinary.com/symplit/image/upload/${e.book_image}`;

            return (
                <div className="booktile" key={e.book_subtitle}>
                    <Link to={`/book/${e.book_id}`} className="booklink">
                        <div style={{ backgroundImage: `url(${imageUrl})` }} className="booktilebook"></div>
                        <h3>{e.book_title}</h3>
                        <h3 className="booktilesubtitle">{e.book_subtitle}</h3>
                        <div className="homeauthorlist">
                            {authorMap}
                        </div>
                    </Link>
                    <div className="adminbuttoncontainer">
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openEditModal(e.book_id)}>Edit</button>}
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openDeleteModal(e.book_id)}>Delete</button>}
                    </div>
                </div>
            )
        })

        var breadcrumb = this.state.crumbToggle ? <button className="breadcrumb" onClick={this.handleBreadCrumb}>Back to List</button> : null

        return (
            <div className="booksbody">
                <div className="breadcrumbcontainer">
                    {breadcrumb}
                </div>
                <div className="booksearch">
                    <input value={this.state.searchInput} onChange={e => this.handleSearchInput(e.target.value)} type="text" className="searchbar" placeholder="Search for Your Textbook" />
                    <button className="searchbutton" onClick={this.handleSearchButton}>Search</button>
                    {adminAddBook}
                </div>
                <div className="homebooks booklist">
                    {bookMap}
                </div>
                <h3 className="bookrequest">Not seeing your textbook? Request yours at <a href="mailto:support@symplit.com" className="supportlink">support@symplit.com</a></h3>

                <Modal isOpen={this.state.addModal} onRequestClose={this.closeAddModal} style={addStyles}>
                    <button onClick={this.closeAddModal}>Close</button>
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
                    <button onClick={() => this.addBook()}>Submit</button>
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

export default connect(mapStateToProps, { getUserInfo, getPath })(Books)