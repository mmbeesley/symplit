/** NPM Modules **/
import React from "react";
import { Link } from "react-router-dom";

/** Import Components */
import AdminButton from "../AdminButton/AdminButton";

/** Exported Component **/
export default function BookTile(props) {
  const { book, openModal, user } = props;

  var authorMap =
    book.author.length > 0
      ? book.author.map((e, i) => {
          return (
            <h3 className="homebookauthor" key={i}>
              {e}
            </h3>
          );
        })
      : null;

  var imageUrl = `http://res.cloudinary.com/symplit/image/upload/${
    book.book_image
  }`;

  return (
    <div className="booktile">
      <Link to={`/book/${book.book_id}`} className="booklink">
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="booktilebook"
        />
        <h3>{book.book_title}</h3>
        <h3 className="booktilesubtitle">{book.book_subtitle}</h3>
        <div className="homeauthorlist">{authorMap}</div>
      </Link>
      <div className="adminbuttoncontainer">
        {!user.is_admin ? null : (
          <AdminButton onClick={() => openModal("edit", book.book_id)} color="blue">
            Edit
          </AdminButton>
        )}
        {!user.is_admin ? null : (
          <AdminButton onClick={() => openModal("delete", book.book_id)} color="blue">
            Delete
          </AdminButton>
        )}
      </div>
    </div>
  );
}
