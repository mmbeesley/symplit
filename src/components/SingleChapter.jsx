import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Footer from './Footer';

class SingleChapter extends Component {
    constructor(){
        super();

        this.state = {
            sections: []
        }
    }

    componentDidMount(){
        let chapterId = this.props.match.params.chapter
        axios.get('/api/sections/'+chapterId).then(sections => {
            this.setState({
                sections: sections.data
            })
        })
    }

    render (){

        let navMap = this.state.sections.length>0 ? this.state.sections.map((e,i) => {
            // let videoMap = e.
            return (
                <div>{e.sectionTitle}</div>
            )
        }) : null

        return (
            <div className="singlechapterbody">
                <div className="booknavcontainer">
                    {navMap}
                </div>
                <div className="singlechaptercontent">
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default SingleChapter;