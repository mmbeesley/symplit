/** NPM Modules **/
import React from "react";
import { Link } from "react-router-dom";

/** Exported Component **/
export default function SavedBookTile(props) {
  const { book, removeSavedBook } = props;

  let imageUrl =
    "http://res.cloudinary.com/symplit/image/upload/" + book.book_image;

  return (
    <div className="savedbooktile">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="savedbookimg"
      />
      <div className="savedbooktitles">
        <h3>{book.book_title}</h3>
        <h3>{book.book_subtitle}</h3>
      </div>
      <div className="savedbookbuttonscontainer">
        <div className="savedbookbutton savedbooklink">
          <Link to={`/book/${book.book_id}`}>Get Started</Link>
        </div>
        <button
          className="savedbookbutton"
          onClick={() => removeSavedBook(book.book_id)}
        >
          Remove from Saved Books
        </button>
      </div>
    </div>
  );
}
