import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { getUserInfo, getPath } from '../ducks/reducer';
import { connect } from 'react-redux';
import Modal from 'react-modal';

const addStyles = {
    content: {
        width: "50%",
        height: "300px",
        background: "white",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "25px"
    }
}

class Home extends Component {
    constructor() {
        super();

        this.state = {
            books: [],
            testimonials: [],
            editing: null,
            deleting: null,
            bodyInput: '',
            nameInput: ''
        }
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.handleBodyInput = this.handleBodyInput.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.addTestimonial = this.addTestimonial.bind(this);
        this.updateTestimonial = this.updateTestimonial.bind(this);
        this.deleteTestimonial = this.deleteTestimonial.bind(this);
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

        this.props.getPath(this.props.location.pathname);
    }

    openAddModal() {
        this.setState({
            addModal: true
        })
    }

    closeAddModal() {
        this.setState({
            addModal: false
        })
    }

    openEditModal(i) {
        axios.get('/api/testimonials/'+i).then(testimonial => {
            this.setState({
                editModal: true,
                editing: i,
                bodyInput: testimonial.data[0].testimonial_text,
                nameInput: testimonial.data[0].testimonial_author
            })
        })
    }

    closeEditModal() {
        this.setState({
            editModal: false,
            editing: null
        })
    }

    openDeleteModal(i) {
        this.setState({
            deleteModal: true,
            deleting: i
        })
    }

    closeDeleteModal() {
        this.setState({
            deleteModal: false,
            deleting: null
        })
    }

    handleBodyInput(e) {
        this.setState({
            bodyInput: e
        })
    }

    handleNameInput(e) {
        this.setState({
            nameInput: e
        })
    }

    addTestimonial() {
        axios.post('/api/testimonials', {testimonial_giver: this.state.nameInput, testimonial_text: this.state.bodyInput}).then(testimonial => {
            this.setState({
                addModal: false,
                bodyInput: '',
                nameInput: ''
            })
        })
    }

    updateTestimonial() {
        axios.put('/api/testimonials/'+this.state.editing, {testimonial_giver: this.state.nameInput, testimonial_text: this.state.bodyInput}).then(testimonial => {
            this.setState({
                editModal: false,
                bodyInput: '',
                nameInput: ''
            })
        })
    }

    deleteTestimonial() {
        axios.delete('/api/testimonials/'+this.state.deleting).then(deleted => {
            this.setState({
                deleteModal: false
            })
        })
    }

    render() {

        let adminAddTestimonial = !this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openAddModal()}>Add Testimonial</button>

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 5000
        };

        var testimonialMap = this.state.testimonials.map((e, i) => {
            return (
                <div key={i} className="testimonialtext">
                    <h3 className="testimonialauthor">{e.testimonial_author} said:</h3>
                    <h3 className="testimonial">"{e.testimonial_text}"</h3>
                    <div className="adminbuttoncontainer">
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openEditModal(e.testimonial_id)}>Edit</button>}
                        {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.openDeleteModal(e.testimonial_id)}>Delete</button>}
                    </div>
                </div>
            )
        });

        var bookMap = this.state.books.map((e, i) => {
            if (i < 4) {
                var authorMap = e.author.length > 0 ? e.author.map((x, y) => {
                    return <h3 className="homebookauthor" key={y}>{x}</h3>
                }) : null

                let imageUrl = `http://res.cloudinary.com/symplit/image/upload/${e.book_image}`;

                return (
                    <Link to={`/book/${e.book_id}`} key={i} className="booktile">
                        <div style={{ backgroundImage: `url(${imageUrl})` }} className="booktilebook"></div>
                        <h3>{e.book_title}</h3>
                        <h3 className="booktilesubtitle">{e.book_subtitle}</h3>
                        <div className="homeauthorlist">
                            {authorMap}
                        </div>
                    </Link>
                )
            } else {
                return null;
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
                        {adminAddTestimonial}
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

                <Modal isOpen={this.state.addModal} onRequestClose={this.closeAddModal} style={addStyles}>
                    <button onClick={this.closeAddModal}>Close</button>
                    <input placeholder="Testimonial Giver Name" value={this.state.nameInput} onChange={(e) => this.handleNameInput(e.target.value)}></input>
                    <input placeholder="Testimonial Body" value={this.state.bodyInput} onChange={(e) => this.handleBodyInput(e.target.value)}></input>
                    <button onClick={() => this.addTestimonial()}>Submit</button>
                </Modal>

                <Modal isOpen={this.state.editModal} onRequestClose={this.closeEditModal} style={addStyles}>
                    <button onClick={this.closeEditModal}>Close</button>
                    <input placeholder="Testimonial Giver Name" value={this.state.nameInput} onChange={(e) => this.handleNameInput(e.target.value)}></input>
                    <input placeholder="Testimonial Body" value={this.state.bodyInput} onChange={(e) => this.handleBodyInput(e.target.value)}></input>
                    <button onClick={() => this.updateTestimonial()}>Submit</button>
                </Modal>

                <Modal isOpen={this.state.deleteModal} onRequestClose={this.closeDeleteModal} style={addStyles}>
                    <div>Are you sure you want to delete this?</div>
                    <button onClick={()=>this.deleteTestimonial()}>Delete</button>
                </Modal>

                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo, getPath })(Home)