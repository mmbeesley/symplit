/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "../../../ducks";
import { connect } from "react-redux";

/** Import Components **/
import Testimonial from "../../Atoms/Testimonial/Testimonial";
import AdminButton from "../../Atoms/AdminButton/AdminButton";
import GetStartedButton from "../../Atoms/GetStartedButton/GetStartedButton";
import TestimonialModal from "../../Modals/TestimonialModal";
import DeleteModal from "../../Modals/DeleteModal";

/** Styles **/
import "./Testimonials.css";

/** Exported Component **/
class Testimonials extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: "",
      bodyInput: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.addTestimonial = this.addTestimonial.bind(this);
    this.updateTestimonial = this.updateTestimonial.bind(this);
    this.deleteTestimonial = this.deleteTestimonial.bind(this);
  }

  /** LifeCycle Methods **/
  componentDidMount() {
    const { getTestimonials } = this.props;
    getTestimonials();
  }

  /** Interaction Methods **/
  openModal(type, id) {
    const key = `${type}
        Modal`;
    const { getTestimonial } = this.props;
    if (id) {
      getTestimonial(id);
    }
    this.setState({
      [key]: true
    });
  }

  closeModal(type) {
    const key = `${type}
        Modal`;
    this.setState({
      [key]: false
    });
  }

  handleInputUpdate(key, value) {
    this.setState({
      [key]: value
    });
  }

  addTestimonial() {
    const { nameInput, bodyInput } = this.state;
    const { createTestimonial } = this.props;
    const body = {
      testimonial_author: nameInput,
      testimonial_text: bodyInput
    };
    createTestimonial(body);
  }

  updateTestimonial() {
    const { nameInput, bodyInput } = this.state;
    const { testimonial, updateTestimonial } = this.props;
    const body = {
      testimonial_author: nameInput,
      testimonial_text: bodyInput
    };
    const id = testimonial.testimonial_id;
    updateTestimonial(id, body);
  }

  deleteTestimonial() {
    const { testimonial, deleteTestimonial } = this.props;
    const id = testimonial.testimonial_id;
    deleteTestimonial(id);
  }

  /** Render Methods **/
  renderAdminButton() {
    return (
      <AdminButton onClick={() => this.openModal("add")} color="white">
        Add Testimonial
      </AdminButton>
    );
  }

  render() {
    const { testimonials, testimonial, user } = this.props;
    const {
      addModal,
      editModal,
      deleteModal,
      nameInput,
      bodyInput
    } = this.state;

    const testimonialsMap =
      testimonials && testimonials.length > 0
        ? testimonials.map((e, i) => {
            return (
              <Testimonial
                testimonial={e}
                key={i}
                openModal={this.openModal}
                user={user}
              />
            );
          })
        : null;

    return (
      <div className="testimonialcontainer">
        <div className="testimonialtitle">Student Testimonials</div>
        {user && !user.is_admin ? null : this.renderAdminButton()}
        <div className="testimonialbody">{testimonialsMap}</div>
        <GetStartedButton color="white" />
        <TestimonialModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          onChange={this.handleInputUpdate}
          submit={this.addTestimonial}
          nameInput={nameInput}
          bodyInput={bodyInput}
        />
        <TestimonialModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          submit={this.updateTestimonial}
          nameInput={testimonial && testimonial.testimonial_author}
          bodyInput={testimonial && testimonial.testimonial_text}
        />
        <DeleteModal
          active={deleteModal}
          closeModal={() => this.closeModal("delete")}
          submit={this.deleteTestimonial}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    testimonials: state.testimonials,
    testimonial: state.testimonial,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {
    getTestimonial,
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
  }
)(Testimonials);
