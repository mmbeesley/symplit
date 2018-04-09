import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Footer from './Footer';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            books: [],
            testimonials: []
        }
    }

    componentDidMount() {
        axios.get('/api/books').then(books => {
            this.setState({
                books: books.data
            })
        })

        axios.get('/api/testimonials').then(testimonials => {
            this.setState({
                testimonials: testimonials.data
            })
        })
    }

    render() {

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000
        };

        var testimonialMap = this.state.testimonials.map((e, i) => {
            return (
                <div key={i} className="testimonialtext">
                    <h3 className="testimonialauthor">{e.testimonial_author} said:</h3>
                    <h3 className="testimonial">"{e.testimonial_text}"</h3>
                </div>
            )
        });

        var bookMap = this.state.books.map((e, i) => {
            if(i<4){
                var authorMap = e.author.length > 0 ? e.author.map((x, y) => {
                    return <h3 className="homebookauthor" key={y}>{x}</h3>
                }) : null
    
                let imageUrl = `http://res.cloudinary.com/symplit/image/upload/${e.book_image}`;
    
                return (
                    <Link to={`/book/${e.book_id}`} key={i} className="booktile">
                        <div style={{backgroundImage: `url(${imageUrl})`}} className="booktilebook"></div>
                        <h3>{e.book_title}</h3>
                        <h3 className="booktilesubtitle">{e.book_subtitle}</h3>
                        <div className="homeauthorlist">
                            {authorMap}
                        </div>
                    </Link>
                )
            }
        })

        return (
            <div className="homebody">
                <div className="homesplash">
                    <div className="hometitle">Struggling in Math?</div>
                    <div className="homesubtitle">Video Walkthroughs of YOUR Textbook</div>
                    <Link to='/books' ><button className="homebooksbutton splashbutton">Get Started</button></Link>
                </div>
                <div className="testimonialcontainer">
                    <div className='testimonialtitle'>
                        Student Testimonials
                    </div>
                    <div className="testimonialbody">
                        <Slider {...settings} className="testimonialcarousel">
                            {testimonialMap}
                        </Slider>
                        <button className="testimonialbutton">Get Started</button>
                    </div>
                </div>
                <div className="homemissioncontainer">
                    <div>WE FULLY BELIEVE THAT</div><div className="homemissionaccent"> EVERY STUDENT CAN SUCCEED</div><div> IN MATH; THEY JUST NEED THE RIGHT TEACHER.</div>
                </div>
                <div className="howcontainer">
                    <div className="howimage"></div>
                    <div className="howbody">
                        <h1>How We Help You</h1>
                        <ul>
                            <li>Content organized by the sections in your textbook</li>
                            <li>Numerous example videos for each concept</li>
                            <li>Downloadable PDFs with unique tips and tricks for tackling the harder concepts</li>
                        </ul>
                        <button className="testimonialbutton">Get Started</button>
                    </div>
                </div>
                <div className="homebookcontainer">
                    <h1 className="homebooktitle">Find Your Textbook</h1>
                    <div className="homebooksubtitle">Finally, professional videos that go with your textbook!</div>
                    <div className="homebooks">
                        {bookMap}
                    </div>
                    <Link to="/books" className="homebooksbutton">FIND YOUR TEXTBOOK</Link>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Home