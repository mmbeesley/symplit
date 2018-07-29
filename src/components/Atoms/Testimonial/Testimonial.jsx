/** NPM Modules **/
import React from "react";

/** Import Components */
import AdminButton from "../AdminButton/AdminButton";

import './Testimonial.css';

/** Exported Component **/
export default function Testimonial(props) {
  const { testimonial, openModal, user } = props;

  return (
    <div className="testimonialtext">
      <h3 className="testimonialauthor">
        {testimonial.testimonial_author} said:
      </h3>
      <h3 className="testimonial">"{testimonial.testimonial_text}"</h3>
      <div className="adminbuttoncontainer">
        {!user.is_admin ? null : (
          <AdminButton
            onClick={() => openModal("edit", testimonial.testimonial_id)}
            color="white"
          >
            Edit
          </AdminButton>
        )}
        {!user.is_admin ? null : (
          <AdminButton
            onClick={() => openModal("delete", testimonial.testimonial_id)}
            color="white"
          >
            Delete
          </AdminButton>
        )}
      </div>
    </div>
  );
}
