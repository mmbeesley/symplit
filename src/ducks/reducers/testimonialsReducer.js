import axios from "axios";
import { clearTestimonial } from "./";

const initialState = [];

const GET_TESTIMONIALS = "GET_TESTIMONIALS";
const CREATE_TESTIMONIAL = "CREATE_TESTIMONIAL";
const UPDATE_TESTIMONIAL = "UPDATE_TESTIMONIAL";
const DELETE_TESTIMONIAL = "DELETE_TESTIMONIAL";

export const getTestimonials = () => {
  let testimonialsData = axios.get("/api/testimonials").then(testimonials => {
    return testimonials.data;
  });
  return {
    type: GET_TESTIMONIALS,
    payload: testimonialsData
  };
};

export const createTestimonial = body => {
  let testimonialsData = axios
    .post("/api/testimonials", body)
    .then(testimonials => {
      return testimonials.data;
    });
  return {
    type: CREATE_TESTIMONIAL,
    payload: testimonialsData
  };
};

export const updateTestimonial = (id, body) => {
  let testimonialsData = axios
    .put(`/api/testimonials/${id}`, body)
    .then(testimonials => {
      clearTestimonial();
      return testimonials.data;
    });
  return {
    type: UPDATE_TESTIMONIAL,
    payload: testimonialsData
  };
};

export const deleteTestimonial = id => {
  let testimonialsData = axios
    .delete(`/api/testimonials/${id}`)
    .then(testimonials => {
      clearTestimonial();
      return testimonials.data;
    });
  return {
    type: DELETE_TESTIMONIAL,
    payload: testimonialsData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TESTIMONIALS + "_FULFILLED":
      return [...action.payload];
    case CREATE_TESTIMONIAL + "_FULFILLED":
      return [...action.payload];
    case UPDATE_TESTIMONIAL + "_FULFILLED":
      return [...action.payload];
    case DELETE_TESTIMONIAL + "_FULFILLED":
      return [...action.payload];
    default:
      return state;
  }
}
