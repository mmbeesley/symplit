/** NPM Modules **/
import React from "react";
import { Link } from "react-router-dom";

/** Imported Components **/
import AdminButton from "../../Atoms/AdminButton/AdminButton";

/** Exported Component **/
export default function BookCrumb(props) {
  const { book, chapter, user, openModal } = props;
  return (
    <div>
      <Link to={`/book/${book.book_id}`} className="bookcrumb">
        <img
          src={`http://res.cloudinary.com/symplit/image/upload/${
            book.book_image
          }`}
          alt="Back to Book"
          className="bookcrumbimg"
        />
        <div>{book.book_title}</div>
      </Link>
      <div className="navchaptertitle">
        {chapter.book_chapter}. {chapter.chapter_title}
      </div>
      {!user.is_admin ? null : (
        <AdminButton onClick={() => openModal("add")} color="white">
          Add Section
        </AdminButton>
      )}
    </div>
  );
}
