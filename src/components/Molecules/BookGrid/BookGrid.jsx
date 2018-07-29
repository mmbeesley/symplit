/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} from "../../../ducks";
import { connect } from "react-redux";

/** Import Components **/
import BookTile from "../../Atoms/BookTile/BookTile";
import AdminButton from "../../Atoms/AdminButton/AdminButton";
import BookModal from "../../Modals/BookModal";
import DeleteModal from "../../Modals/DeleteModal";

/** Exported Component **/
class BookGrid extends Component {
  constructor() {
    super();

    this.state = {};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.addBook = this.addBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  /** LifeCycle Methods **/
  componentDidMount() {
    const { getBooks } = this.props;
    getBooks();
  }

  /** Interaction Methods **/
  openModal(type, id) {
    const key = `${type}Modal`;
    const { getBook } = this.props;
    if (id) {
      getBook(id);
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

  handleImage() {
    let _this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "symplit", upload_preset: "rg7skvww" },
      function(error, result) {
        for (var i = result[0].path.length - 1; i > 0; i--) {
          if (result[0].path[i] === "/") {
            break;
          }
          _this.setState({
            bookImage: result[0].path.slice(i)
          });
        }
      }
    );
  }

  addBook() {
    const {
      bookTitle,
      bookSubtitle,
      bookImage,
      bookSubject,
      bookAuthor,
      memRequired,
      memIds,
      bookVisible
    } = this.state;
    const { createBook } = this.props;
    const body = {
      book_title: bookTitle,
      book_subtitle: bookSubtitle,
      book_image: bookImage,
      book_subject: bookSubject,
      author: bookAuthor,
      membership_required_book: memRequired,
      membership_ids_book: memIds,
      visible: bookVisible
    };
    createBook(body);
  }

  updateBook() {
    const {
      bookTitle,
      bookSubtitle,
      bookImage,
      bookSubject,
      bookAuthor,
      memRequired,
      memIds,
      bookVisible
    } = this.state;
    const { book, updateBook } = this.props;
    const body = {
      book_title: bookTitle,
      book_subtitle: bookSubtitle,
      book_image: bookImage,
      book_subject: bookSubject,
      author: bookAuthor,
      membership_required_book: memRequired,
      membership_ids_book: memIds,
      visible: bookVisible
    };
    const id = book.book_id;

    updateBook(id, body);
  }

  deleteBook() {
    const { book, deleteBook } = this.props;
    const id = book.book_id;

    deleteBook(id);
  }

  /** Render Methods **/
  renderAdminButton() {
    return (
      <AdminButton onClick={() => this.openModal("add")} color="blue">
        Add Book
      </AdminButton>
    );
  }

  renderBookTile(e, i) {
    const { user } = this.props;
    return <BookTile book={e} key={i} openModal={this.openModal} user={user} />;
  }

  render() {
    const { books, user, book, limiter } = this.props;
    const {
      addModal,
      editModal,
      deleteModal,
      bookTitle,
      bookSubTitle,
      bookImage,
      bookSubject,
      bookAuthor,
      memRequired,
      memIds,
      bookVisible
    } = this.state;

    return (
      <div className="homebookcontainer">
        <h1 className="homebooktitle">Find Your Textbook</h1>
        <div className="homebooksubtitle">
          Finally, professional videos that go with your textbook!
        </div>
        {user && !user.is_admin ? null : this.renderAdminButton()}
        <div className="homebooks">
          {books && books.length > 0
            ? books.map((e, i) => {
                if (!limiter || i < limiter) {
                  return this.renderBookTile(e, i);
                }
              })
            : null}
        </div>

        <BookModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          handleImage={this.handleImage}
          onChange={this.handleInputUpdate}
          bookTitle={bookTitle}
          bookSubTitle={bookSubTitle}
          bookImage={bookImage}
          bookSubject={bookSubject}
          bookAuthor={bookAuthor}
          memRequired={memRequired}
          memIds={memIds}
          bookVisible={bookVisible}
          submit={this.addBook}
        />

        <BookModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          handleImage={this.handleImage}
          bookTitle={book && book.book_title}
          bookSubTitle={book && book.book_subtitle}
          bookImage={book && book.book_image}
          bookSubject={book && book.book_subject}
          bookAuthor={book && book.author}
          memRequired={book && book.membership_required_book}
          memIds={book && book.membership_ids_book}
          bookVisible={book && book.visible}
          submit={this.updateBook}
        />

        <DeleteModal
          active={deleteModal}
          closeModal={() => this.closeModal("delete")}
          submit={this.deleteBook}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    book: state.book,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {
    getBook,
    getBooks,
    createBook,
    updateBook,
    deleteBook
  }
)(BookGrid);
