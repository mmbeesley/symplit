import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { connect } from "react-redux";
import { getUserInfo, getPath } from "../ducks/reducer";
import Modal from "react-modal";

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
};

class Books extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      searchInput: "",
      crumbToggle: false,
      bookTitle: "",
      bookSubtitle: "",
      bookImage: "",
      bookSubject: "",
      bookAuthor: [],
      bookMemRequired: false,
      bookMemIds: [],
      bookVisible: false
    };

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
    axios.get("/api/books").then(books => {
      this.setState({
        books: books.data
      });
    });
    this.props.getUserInfo();
    this.props.getPath(this.props.location.pathname);
  }

  handleSearchInput(e) {
    this.setState({
      searchInput: e
    });
  }

  handleSearchButton() {
    let search = this.state.searchInput;
    axios.get("/api/books/search?book=" + search).then(books => {
      this.setState({
        books: books.data,
        searchInput: "",
        crumbToggle: true
      });
    });
  }

  handleBreadCrumb() {
    axios.get("/api/books").then(books => {
      this.setState({
        books: books.data,
        crumbToggle: false
      });
    });
  }

  render() {
    let adminAddBook = !this.props.user.is_admin ? null : (
      <button className="adminbutton" onClick={() => this.openAddModal()}>
        Add Book
      </button>
    );

    var bookMap = this.state.books.map((e, i) => {
      var authorMap =
        e.author.length > 0
          ? e.author.map((x, y) => {
              return (
                <h3 key={y} className="homebookauthor">
                  {x}
                </h3>
              );
            })
          : null;

      let imageUrl = `http://res.cloudinary.com/symplit/image/upload/${
        e.book_image
      }`;

      return (
        <div className="booktile" key={e.book_subtitle}>
          <Link to={`/book/${e.book_id}`} className="booklink">
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              className="booktilebook"
            />
            <h3>{e.book_title}</h3>
            <h3 className="booktilesubtitle">{e.book_subtitle}</h3>
            <div className="homeauthorlist">{authorMap}</div>
          </Link>
          <div className="adminbuttoncontainer">
            {!this.props.user.is_admin ? null : (
              <button
                className="adminbutton"
                onClick={() => this.openEditModal(e.book_id)}
              >
                Edit
              </button>
            )}
            {!this.props.user.is_admin ? null : (
              <button
                className="adminbutton"
                onClick={() => this.openDeleteModal(e.book_id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      );
    });

    var breadcrumb = this.state.crumbToggle ? (
      <button className="breadcrumb" onClick={this.handleBreadCrumb}>
        Back to List
      </button>
    ) : null;

    return (
      <div className="booksbody">
        <div className="homebooks booklist">{bookMap}</div>
        <h3 className="bookrequest">
          Not seeing your textbook? Request yours at{" "}
          <a href="mailto:support@symplit.com" className="supportlink">
            support@symplit.com
          </a>
        </h3>

        <Modal
          isOpen={this.state.addModal}
          onRequestClose={this.closeAddModal}
          style={addStyles}
        >
          <button onClick={() => this.addBook()}>Submit</button>
        </Modal>

        <Modal
          isOpen={this.state.editModal}
          onRequestClose={this.closeEditModal}
          style={addStyles}
        >
          <button onClick={this.closeEditModal}>Close</button>
          <div className="checkboxfield">
            Title:{" "}
            <input
              placeholder="Book Title"
              value={this.state.bookTitle}
              onChange={e => this.handleTitle(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Subtitle:{" "}
            <input
              placeholder="Book Subtitle"
              value={this.state.bookSubtitle}
              onChange={e => this.handleSubtitle(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Upload New Image:{" "}
            <button onClick={this.handleImage} className="upload=button">
              Add Image
            </button>
          </div>
          <p>Current Image: {this.state.bookImage}</p>
          <div className="checkboxfield">
            Subject:{" "}
            <input
              placeholder="Book Subject"
              value={this.state.bookSubject}
              onChange={e => this.handleSubject(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Author(s):{" "}
            <input
              placeholder="Book Author"
              value={this.state.bookAuthor}
              onChange={e => this.handleAuthor(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Is Membership Required?{" "}
            <input
              type="checkbox"
              defaultChecked={this.state.bookMemRequired}
              onChange={e => this.handleMemRequired(e.target.checked)}
            />
          </div>
          <div className="checkboxfield">
            Membership IDs:{" "}
            <input
              placeholder="Book Membership IDs"
              value={this.state.bookMemIds}
              onChange={e => this.handleMemIds(e.target.value)}
            />
          </div>
          <div className="checkboxfield">
            Is this book Visible yet?{" "}
            <input
              type="checkbox"
              defaultChecked={this.state.bookVisible}
              onChange={e => this.handleVisible(e.target.checked)}
            />
          </div>
          <button onClick={() => this.updateBook()}>Submit</button>
        </Modal>

        <Modal
          isOpen={this.state.deleteModal}
          onRequestClose={this.closeDeleteModal}
          style={addStyles}
        >
          <button onClick={this.closeDeleteModal}>Close</button>
          <div>Are you sure you want to delete this?</div>
          <button onClick={() => this.deleteBook()}>Delete</button>
        </Modal>

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUserInfo, getPath }
)(Books);
