/** NPM Modules **/
import React from "react";
import { Link } from "react-router-dom";

/** Import Components **/
import AdminButton from "../AdminButton/AdminButton";

/** Exported Component **/
export default function ChapterLink(props) {
  const { chapter, openModal, user, bookId } = props;

  return (
    <div className="chaptercontainer">
      <Link
        to={`/book/${bookId}/${chapter.chapter_id}`}
        className="chaptertile"
      >
        <div className="chapternumber">CHAPTER {chapter.book_chapter}</div>
        <div className="chaptertitle">{chapter.chapter_title}</div>
      </Link>
      <div className="adminbuttoncontainer">
        {!user.is_admin ? null : (
          <AdminButton
            onClick={() => openModal("edit", chapter.chapter_id)}
            color="blue"
          >
            Edit
          </AdminButton>
        )}
        {!user.is_admin ? null : (
          <AdminButton
            onClick={() => openModal("delete", chapter.chapter_id)}
            color="blue"
          >
            Delete
          </AdminButton>
        )}
      </div>
    </div>
  );
}
