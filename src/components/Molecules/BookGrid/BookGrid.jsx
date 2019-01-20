/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} from "../../../ducks/reducers";
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

    this.state = {
      addModal: false,
      editModal: false,
      deleteModal: false,
      book_title: "",
      book_subtitle: "",
      book_image: "",
      book_subject: "",
      author: "",
      membership_required_book: false,
      membership_ids_book: "",
      visible: false
    };
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

  static getDerivedStateFromProps(props, state) {
    const { book } = props;
    if (book.book_id !== state.book_id) {
      return { ...book };
    }
    return null;
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
            book_image: result[0].path.slice(i)
          });
        }
      }
    );
  }

  addBook() {
    const {
      book_title,
      book_subtitle,
      book_image,
      book_subject,
      author,
      membership_required_book,
      membership_ids_book,
      visible
    } = this.state;
    const { createBook } = this.props;
    const body = {
      book_title,
      book_subtitle,
      book_image,
      book_subject,
      author,
      membership_required_book,
      membership_ids_book,
      visible
    };
    createBook(body);
  }

  updateBook() {
    const {
      book_title,
      book_subtitle,
      book_image,
      book_subject,
      author,
      membership_required_book,
      membership_ids_book,
      visible
    } = this.state;
    const { book, updateBook } = this.props;
    const body = {
      book_title,
      book_subtitle,
      book_image,
      book_subject,
      author,
      membership_required_book,
      membership_ids_book,
      visible
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
    const { books, user, limiter } = this.props;
    const {
      addModal,
      editModal,
      deleteModal,
      book_title,
      book_subtitle,
      book_image,
      book_subject,
      author,
      membership_required_book,
      membership_ids_book,
      visible
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
                return null;
              })
            : null}
        </div>

        <BookModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          handleImage={this.handleImage}
          onChange={this.handleInputUpdate}
          book_title={book_title}
          book_subtitle={book_subtitle}
          book_image={book_image}
          book_subject={book_subject}
          author={author}
          membership_required_book={membership_required_book}
          membership_ids_book={membership_ids_book}
          visible={visible}
          submit={this.addBook}
        />

        <BookModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          handleImage={this.handleImage}
          book_title={book_title}
          book_subtitle={book_subtitle}
          book_image={book_image}
          book_subject={book_subject}
          author={author}
          membership_required_book={membership_required_book}
          membership_ids_book={membership_ids_book}
          visible={visible}
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
