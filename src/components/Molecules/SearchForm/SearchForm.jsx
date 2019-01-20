/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { searchBooks, getBooks } from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Exported Component **/
class SearchForm extends Component {
  constructor() {
    super();

    this.state = {
      crumbToggle: false,
      searchInput: ""
    };
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleBreadCrumb = this.handleBreadCrumb.bind(this);
  }

  /** Interaction Methods **/
  handleBreadCrumb() {
    const { getBooks } = this.props;
    getBooks();
    this.setState({
      crumbToggle: false
    });
  }

  handleSearchInput(e) {
    this.setState({
      searchInput: e
    });
  }

  handleSearchButton() {
    const { searchInput } = this.state;
    const { searchBooks } = this.props;
    searchBooks(searchInput);
    this.setState({
      crumbToggle: true
    });
  }

  /** Render Methods **/
  render() {
    const { crumbToggle, searchInput } = this.state;

    return (
      <div>
        <div className="breadcrumbcontainer">
          {crumbToggle && (
            <button className="breadcrumb" onClick={this.handleBreadCrumb}>
              Back to List
            </button>
          )}
        </div>
        <div className="booksearch">
          <input
            value={searchInput}
            onChange={e => this.handleSearchInput(e.target.value)}
            type="text"
            className="searchbar"
            placeholder="Search for Your Textbook"
          />
          <button className="searchbutton" onClick={this.handleSearchButton}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    searchBooks,
    getBooks
  }
)(SearchForm);
