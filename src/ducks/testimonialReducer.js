import axios from "axios";

const initialState = {};

const GET_TESTIMONIAL = "GET_TESTIMONIAL";

export const getTestimonial = id => {
  let testimonialData = axios
    .get(`/api/testimonials/${id}`)
    .then(testimonial => {
      return testimonial.data;
    });
  return {
    type: GET_TESTIMONIAL,
    payload: testimonialData
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TESTIMONIAL + "_FULFILLED":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
