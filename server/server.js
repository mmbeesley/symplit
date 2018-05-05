//Package Declarations
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const app = express();
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.SERVER_PORT || 3500;
const cloudinary = require('cloudinary');

//Controller Declarations
const contentController = require('./controllers/contentController')
const paymentController = require('./controllers/paymentController')
const problemsController = require('./controllers/problemsController')
const testimonialController = require('./controllers/testimonialController')
const userController = require('./controllers/userController')
const bookController = require('./controllers/bookController')
const chapterController = require('./controllers/chapterController')
const sectionController = require('./controllers/sectionController')
const sectionVideoController = require('./controllers/sectionVideoController')
const videoController = require('./controllers/videoController')
const membershipController = require('./controllers/membershipController')
const offerController = require('./controllers/offerController')

//Hosting
// app.use( express.static( `${__dirname}/../build`) );

//Top Level Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then((db) => {
    app.set('db', db);
})
app.use(cors());

cloudinary.config({
    cloud_name: 'symplit',
    api_key: '364962671353451',
    api_secret: process.env.CLOUDINARY_SECRET
});

app.use(passport.initialize());
app.use(passport.session());


// Auth0 Strategy //need to know what clients we are using for login so that I can build the strategy
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid email'
}, (accessToken, refreshToken, extraParams, email, done) => {//receives profile from auth callback endpoint

    const db = app.get('db');//database connection
    
    let { emails, user_id } = email;

    db.find_user([user_id]).then(function (users) { //checks if user doesn't exist and adds them to database, if user does exist, returns user
        if (!users[0]) {
            db.create_user([user_id, emails[0].value])
                .then(user => {
                    return done(null, user[0].user_id)
                })
        } else {
            return done(null, users[0].user_id)
        }
    })
}))
//Serialize User, receives profile data from auth strategy callback, ties profile to session id in session store and cookie
passport.serializeUser((id, done) => {
    return done(null, id);
})
//Deserialize User, checks session user_id from cookie, receives profile data and adds it to req.user, is hit when session user hits endpoint
passport.deserializeUser((id, done) => {
    const db = app.get('db')
    db.find_session_user([id]).then(function(user){
        return done(null,user[0])
    })
})

//Auth endpoints
app.get('/auth', passport.authenticate('auth0'));//kicks off authentication process, redirects us to auth0, then redirects to callback with data
app.get('/auth/callback', passport.authenticate('auth0', {//kicks off authentication process again to make sure is authenticated and receives data and inserts data into profile parameter, sends profile to strategy
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/'
}));

//Endpoints
//Login
app.get('/auth/me', (req,res)=>{
    if(!req.user){
        res.status(404).send('User not found.');
    } else {
        res.status(200).send(req.user);
    }
})
//Logout
app.get('/auth/logout', function(req,res){
    req.logOut();
    res.redirect('http://localhost:3000/')
})

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
app.get('/api/chapsections/:chapterId', contentController.getChapterSections); //Gets just sections without sections videos in case sections don't have section videos for display on the sections view
app.get('/api/sectionvideos/:sectionId', contentController.getSectionVideos); //Gets all videos of a section based on section id from db for display on the videos view. JOIN with videos table.

//Admin Book Endpoints
app.get('/api/books/:bookId', bookController.getOneBook); //Get single book based on book id
app.post('/api/books', bookController.createBook); //Req.body will send book_title, book_subtitle, book_image, book_subject, author, membership_required, visible to backend. Adds new book to books table
app.put('/api/books/:bookId', bookController.updateBook); //Update book details based on book id
app.delete('/api/books/:bookId', bookController.deleteBook); //Delete book based on book id

//Admin Chapter Endpoints
app.get('/api/chapter/:chapterId', chapterController.getOneChapter); //Get single chapter based on chapter id
app.post('/api/chapters', chapterController.createChapter); //Req.body will send book_id, book_chapter, chapter_title, chapter_text, membership_required. Adds new chapter to chapters table
app.put('/api/chapters/:chapterId', chapterController.updateChapter); //Update chapter details based on chapter id
app.delete('/api/chapters/:chapterId', chapterController.deleteChapter); //Delete chapter based on chapter id

//Admin Section Endpoints
app.get('/api/section/:sectionId/:chapterId', sectionController.getOneSection); //Get single section based on section id
app.post('/api/sections', sectionController.createSection); //Req.body will send chapter_id, section_number, section_title, practice_pdf, section_text, membership_required, membership_ids, array of problem_id's. Adds new section to sections table
app.put('/api/sections/:sectionId/:chapterId', sectionController.updateSection); //Update section details based on section id
app.delete('/api/sections/:sectionId/:chapterId', sectionController.deleteSection); //Delete section based on section id

//Admin Section Video Endpoints
app.get('/api/sectionvideo/:sectionvideoId', sectionVideoController.getOneSectionVideo); //Get single sectionvideo based on sectionvideo id
app.post('/api/sectionvideos', sectionVideoController.createSectionVideo); //Req.body will send section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required, membership_ids. Adds new sectionvideo to sectionvideos table.
app.put('/api/sectionvideos/:sectionvideoId', sectionVideoController.updateSectionVideo); //Update sectionvideo details based on sectionvideo id
app.delete('/api/sectionvideos/:sectionvideoId', sectionVideoController.deleteSectionVideo); //Delete sectionvideo based on sectionvideo id

//Admin Video Endpoints
app.get('/api/videos', videoController.getVideos); //Get all videos for selection to add to sections
app.get('/api/video/:videoId', videoController.getOneVideo); //Get one video for admin view to be able to update and delete
app.post('/api/videos', videoController.createVideo); //Req.body will send video_title, video_url, video_problem, video_thumbnail. Adds new video to videos table
app.put('/api/videos/:videoId', videoController.updateVideo); //Update video details based on video id
app.delete('/api/videos/:videoId', videoController.deleteVideo); //Delete video based on video id

// Testimonial Endpoints
app.get('/api/testimonials', testimonialController.getTestimonials); //Gets list of testimonials from db for display on home view and purchase view

// Admin Testimonial Endpoints
app.get('/api/testimonials/:testimonialId', testimonialController.getOneTestimonial); //Gets one testimonial for admin view
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
app.get('/api/memberships', membershipController.getMemberships) //Gets list of memberships available for purchase

//Admin Memberships Endpoints
app.get('/api/memberships/:membershipId', membershipController.getOneMembership) //Gets one membership based on membership id for admin view
app.post('/api/memberships', membershipController.createMembership) //Req.body sends membership_title, membership_description, membership_price, membership_recurring, membership_period. Adds membership to memberships table
app.put('/api/memberships/:membershipId', membershipController.updateMembership) //Update membership details based on membership id
app.delete('/api/memberships/:membershipId', membershipController.deleteMembership) //Delete membership based on membership id

//Offers Endpoints
app.get('/api/offers', offerController.getOffers) //Gets list of offers for comparison on checkout page

//Admin Offers Endpoints
app.get('/api/offers/:offerId', offerController.getOneOffer) //Gets one offer for editing on admin view
app.post('/api/offers', offerController.createOffer) //Req.body sends offer_title, offer_code, discount. Adds offer to offers table.
app.put('/api/offers/:offerId', offerController.updateOffer) //Update offer details based on offer id
app.delete('/api/offers/:offerId', offerController.deleteOffer) //Delete offer based on offer id

////////////////////////////////////////////Listen/////////////////////////////////////////
app.listen(port, () => {
    console.log(`Port ${port} is not the droids you're looking for...`)
})
