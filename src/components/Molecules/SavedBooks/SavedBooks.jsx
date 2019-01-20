/** NPM Modules **/
import React, { Component } from "react";
import { Link } from "react-router-dom";

/** Redux **/
import { connect } from "react-redux";
import { getSavedBooks, removeSavedBook } from "../../../ducks/reducers";
import SavedBookTile from "../../Atoms/SavedBookTile/SavedBookTile";

/** Import Components **/

/** Exported Components **/
class SavedBooks extends Component {
  /** LifeCycle Methods **/
  componentDidMount() {
    const { getSavedBooks } = this.props;

    getSavedBooks();
  }

  /** Render Methods **/
  renderSavedBooks() {
    const { savedBooks, removeSavedBook } = this.props;

    if (savedBooks.length) {
      return savedBooks.map((e, i) => {
        return (
          <SavedBookTile book={e} key={i} removeSavedBook={removeSavedBook} />
        );
      });
    } else {
      return (
        <div className="savedbooksmsg">
          <h3>You don't have any books saved to your profile</h3>
          <p>
            <Link to="/books">Click here</Link> to find a text book to study!
          </p>
        </div>
      );
    }
  }

  render() {
    const { savedBooks } = this.props;

    return (
      <div className="accountsavedbooks">
        <h2>Your Saved Books</h2>
        <div className="savedbookscontainer">
          {savedBooks && this.renderSavedBooks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedBooks: state.savedBooks
  };
}

export default connect(
  mapStateToProps,
  { getSavedBooks, removeSavedBook }
)(SavedBooks);
