//Package Declarations
require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , cors = require('cors')
    , app = express()

//Controller Declarations
const contentController = require('./controllers/contentController')
    , paymentController = require('./controllers/paymentController')
    , problemsController = require('./controllers/problemsController')
    , testimonialController = require('./controllers/testimonialController')
    , userController = require('./controllers/userController')
    , bookController = require('./controllers/bookController')
    , chapterController = require('./controllers/chapterController')
    , sectionController = require('./controllers/sectionController')
    , sectionVideoController = require('./controllers/sectionVideoController')
    , videoController = require('./controllers/videoController')
    , membershipController = require('./controllers/membershipController')
    , offerController = require('./controllers/offerController')

//Top Level Middleware
app.use(bodyParser.json());
app.use(cors());
massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//Auth0 Strategy //need to know what clients we are using for login so that I can build the strategy
// passport.use(new Auth0Strategy({
//     domain: process.env.AUTH_DOMAIN,
//     clientID: process.env.AUTH_CLIENT_ID,
//     clientSecret: process.env.AUTH_CLIENT_SECRET,
//     callbackURL: process.env.AUTH_CALLBACK_URL,
//     scope: `openid profile`
// }, function (accessToken, refreshToken, extraParams, profile, done) {
//     console.log(profile) // need to figure out what profile comes back as
//     
//     db.get_user([]).then((users) => {
//     if (!users[0]) {
//         db.create_user([]).then(newUser => {
//             return done(null, newUser[0].user_id)
//         })
//     } else {
//         return done(null, users[0].user_id)
//     }
// })
//     })
// }))

//User Endpoints
passport.serializeUser(userController.serialize);
passport.deserializeUser(userController.deserialize);
app.get('/auth', passport.authenticate('auth0')); //Redirect to auth0
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.REACT_APP_REDIRECT,
    failureRedirect: '/'})); //Redirect back to site
app.get('/auth/me', userController.loginUser); //Login user, add cookie to sessions, add user to database.
app.get('/auth/logout', userController.logoutUser); //Logout user

//Admin User Endpoints
app.get('/api/users/:userId', userController.getOneUser) //Get one user for admin view
app.get('/api/users', userController.getUsers); //Show all users on admin view
app.put('/api/users/:userId', userController.makeAdmin); //Make user an admin based on the user id
app.put('/api/admins/:userId', userController.removeAdmin); //Take away admin priveleges from user based on user id
app.put('/api/members/:userId', userController.unsubscribe); //Unsubscribe member based on the user id
app.get('/api/users/search', userController.getSearchUsers); //Get users based on req.query

//Payment Endpoints
app.post('/api/payment', paymentController.payment); //Req.body sends total to backend. Response will be successful payment and result in user membership in site

//Content Endpoints
app.get('/api/books', contentController.getBooks); //Gets all books for display on the books view
app.get('/api/books/search', contentController.searchBooks); //Gets all books based on req.query, searches through database based on subject and book title/subtitle for display on search results view
app.get('/api/chapters/:bookId', contentController.getChapters); //Gets all chapters of a book based on book id from db for display on the chapters view
app.get('/api/sections/:chapterId', contentController.getSections); //Gets all sections of a chapter based on chapter id from db for display on the sections view
app.get('/api/sectionvideos/:sectionId', contentController.getSectionVideos); //Gets all videos of a section based on section id from db for display on the videos view. JOIN with videos table.

//Admin Book Endpoints
app.get('/api/books/:bookId', bookController.getOneBook); //Get single book based on book id
app.post('/api/books', bookController.createBook); //Req.body will send book_title, book_subtitle, book_image, book_subject, author, membership_required, visible to backend. Adds new book to books table
app.put('/api/books/:bookId', bookController.updateBook); //Update book details based on book id
app.delete('/api/books/:bookId', bookController.deleteBook); //Delete book based on book id

//Admin Chapter Endpoints
app.get('/api/chapters/:chapterId', chapterController.getOneChapter); //Get single chapter based on chapter id
app.post('/api/chapters', chapterController.createChapter); //Req.body will send book_id, book_chapter, chapter_title, chapter_text, membership_required. Adds new chapter to chapters table
app.put('/api/chapters/:chapterId', chapterController.updateChapter); //Update chapter details based on chapter id
app.delete('/api/chapters/:chapterId', chapterController.deleteChapter); //Delete chapter based on chapter id

//Admin Section Endpoints
app.get('/api/sections/:sectionId', sectionController.getOneSection); //Get single section based on section id
app.post('/api/sections', sectionController.createSection); //Req.body will send chapter_id, section_number, section_title, practice_pdf, section_text, membership_required, membership_ids, array of problem_id's. Adds new section to sections table
app.put('/api/sections/:sectionId', sectionController.updateSection); //Update section details based on section id
app.delete('/api/sections/:sectionId', sectionController.deleteSection); //Delete section based on section id

//Admin Section Video Endpoints
app.get('/api/sectionvideos/:sectionvideoId', sectionVideoController.getOneSectionVideo); //Get single sectionvideo based on sectionvideo id
app.post('/api/sectionvideos', sectionVideoController.createSectionVideo); //Req.body will send section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required, membership_ids. Adds new sectionvideo to sectionvideos table.
app.put('/api/sectionvideos/:sectionvideoId', sectionVideoController.updateSectionVideo); //Update sectionvideo details based on sectionvideo id
app.delete('/api/sectionvideos/:sectionvideoId', sectionVideoController.deleteSectionVideo); //Delete sectionvideo based on sectionvideo id

//Admin Video Endpoints
app.get('/api/videos', videoController.getVideos); //Get all videos for selection to add to sections
app.get('/api/videos/:videoId', videoController.getOneVideo); //Get one video for admin view to be able to update and delete
app.post('/api/videos', videoController.createVideo); //Req.body will send video_title, video_url, video_problem, video_thumbnail. Adds new video to videos table
app.put('/api/videos/:videoId', videoController.updateVideo); //Update video details based on video id
app.delete('/api/videos/:videoId', videoController.deleteVideo); //Delete video based on video id

//Testimonial Endpoints
app.get('/api/testimonials', testimonialController.getTestimonials); //Gets list of testimonials from db for display on home view and purchase view

//Admin Testimonial Endpoints
app.get('/api/testimonials', testimonialController.getOneTestimonial); //Gets one testimonial for admin view
app.post('/api/testimonials', testimonialController.createTestimonial); //Req.body sends testimonial_giver, testimonial_text. Adds to testimonials table
app.put('/api/testimonials/:testimonialId', testimonialController.updateTestimonial); //Update testimonial details based on testimonial id
app.delete('/api/testimonials/:testimonialId', testimonialController.deleteTestimonial); //Delete testimonial based on testimonial id

//Practice Problems Endpoints
app.get('/api/problems/:sectionId', problemsController.getProblems); //Gets list of practice problems based on sectionId from db for display on practice problems carousel

//Admin Practice Problems Endpoints
app.get('/api/problems/:problemId', problemsController.getOneProblem); //Gets one problem for editing on admin view
app.post('/api/problems', problemsController.createProblem); //Req.body sends problem_title, problem_image, problem_solution, membership_required. Adds to practiceproblems table.
app.put('/api/problems/:problemId', problemsController.updateProblem); //Update practice problems details based on problem id
app.delete('/api/problems/:problemId', problemsController.deleteProblem); //Delete problem based on problem id

//Memberships Endpoints
app.get('/api/memberships', membershipController.getMemberships)

//Admin Memberships Endpoints
app.get('/api/memberships/:membershipId', membershipController.getOneMembership)
app.post('/api/memberships', membershipController.createMembership)
app.put('/api/memberships/:membershipId', membershipController.updateMembership)
app.delete('/api/memberships/:membershipId', membershipController.deleteMembership)

//Offers Endpoints
app.get('/api/offers', offerController.getOffers)

//Admin Offers Endpoints
app.get('/api/offers/:offerId', offerController.getOneOffer)
app.post('/api/offers', offerController.createOffer)
app.put('/api/offers/:offerId', offerController.updateOffer)
app.delete('/api/offers/:offerId', offerController.deleteOffer)

//Hosting
app.use( express.static( `${__dirname}/../build`) );

//Server Port
const port = process.env.SERVER_PORT || 5000

////////////////////////////////////////////Listen/////////////////////////////////////////
app.listen(port, () => console.log(`Port ${port} is not the droids you're looking for...`))