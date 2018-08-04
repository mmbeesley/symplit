import { combineReducers } from "redux";

import reducer from "./reducer";
import booksReducer from "./booksReducer";
import testimonialsReducer from "./testimonialsReducer";
import testimonialReducer from "./testimonialReducer";
import bookReducer from "./bookReducer";
import userReducer from "./userReducer";
import savedBooksReducer from "./savedBooksReducer";
import chapterReducer from "./chapterReducer";
import chaptersReducer from "./chaptersReducer";
import problemReducer from "./problemReducer";
import problemsReducer from "./problemsReducer";
import completedProblemsReducer from "./completedProblemsReducer";
import bookSectionsReducer from "./bookSectionsReducer";
import sectionReducer from "./sectionReducer";
import sectionsReducer from "./sectionsReducer";
import sectionVideoReducer from "./sectionVideoReducer";
import videoReducer from "./videoReducer";
import videosReducer from "./videosReducer";

const appReducer = combineReducers({
  app: reducer,
  user: userReducer,
  books: booksReducer,
  book: bookReducer,
  testimonials: testimonialsReducer,
  testimonial: testimonialReducer,
  savedBooks: savedBooksReducer,
  chapter: chapterReducer,
  chapters: chaptersReducer,
  problem: problemReducer,
  problems: problemsReducer,
  completedProblems: completedProblemsReducer,
  bookSections: bookSectionsReducer,
  section: sectionReducer,
  sections: sectionsReducer,
  sectionVideo: sectionVideoReducer,
  videos: videosReducer,
  video: videoReducer
});

export default appReducer;
export * from "./reducer";
export * from "./userReducer";
export * from "./booksReducer";
export * from "./bookReducer";
export * from "./testimonialsReducer";
export * from "./testimonialReducer";
export * from "./savedBooksReducer";
export * from "./chapterReducer";
export * from "./chaptersReducer";
export * from "./problemReducer";
export * from "./problemsReducer";
export * from "./completedProblemsReducer";
export * from "./bookSectionsReducer";
export * from "./sectionReducer";
export * from "./sectionsReducer";
export * from "./sectionVideoReducer";
export * from "./videosReducer";
export * from "./videoReducer";
