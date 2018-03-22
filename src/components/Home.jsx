import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div className="homebody">
                <div className="homesplash">
                    <div className="hometitle">Struggling in Math?</div>
                    <div className="homesubtitle">Textbook-Specific Tutorial Videos</div>
                </div>
                <div className="testimonialcontainer">
                    <div className='testimonialtitle'>
                        Student Testimonials
                    </div>
                    <div className="testimonialbody">
                        <div className='testimonialcarousel'>

                        </div>
                        <button className="testimonialbutton">GET STARTED</button>
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
                        <button className="testimonialbutton">GET STARTED</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(Home)