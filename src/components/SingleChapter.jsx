import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import ReactPlayer from 'react-player';

const videoStyle = {
    border: "solid",
    borderWidth: "2px",
    borderColor: "var(--logo-gray)",
    padding: "2px",
    borderRadius: "2px"
}

class SingleChapter extends Component {
    constructor() {
        super();

        this.state = {
            book: [],
            chapter: [],
            sections: []
        }
    }

    componentDidMount() {
        let chapterId = this.props.match.params.chapter
        let bookId = this.props.match.params.book
        let sections = axios.get('/api/sections/' + chapterId);
        let chapter = axios.get('/api/chapter/' + chapterId);
        let book = axios.get('/api/books/' + bookId);

        axios.all([sections, chapter, book]).then(res => {
            this.setState({
                sections: res[0].data,
                chapter: res[1].data,
                book: res[2].data
            })
        })
    }

    render() {

        let book = this.state.book[0];
        let chapter = this.state.chapter[0];

        let navMap = this.state.sections.length > 0 ? this.state.sections.map((e, i) => {
            let videoMap = e.sectionVideos.map((x, y) => {
                return (
                    <a href={`#${x.sectionVideoTitle}`} key={x.sectionVideoId}>
                        <li className="videolistitem">
                            {x.sectionVideoTitle}
                        </li>
                    </a>
                )
            })
            return (
                <div key={e.sectionId}>
                    <Link to={`/book/${book.book_id}`} className="bookcrumb">
                        <img src={`http://res.cloudinary.com/symplit/image/upload/${book.book_image}`} alt="Back to Book" className="bookcrumbimg" />
                        <div>{book.book_title}</div>
                    </Link>
                    <div className="navchaptertitle">{chapter.book_chapter}. {chapter.chapter_title}</div>
                    <a href={`#${e.sectionTitle}`} ><div className="sectiontitle">{this.props.match.params.chapter}.{e.sectionNumber} {e.sectionTitle}</div></a>
                    <ul className="videolist">
                        {videoMap}
                    </ul>
                </div>
            )
        }) : null

        let bodyMap = this.state.sections.length > 0 ? this.state.sections.map((e, i) => {
            let bodyVideoMap = e.sectionVideos.map((x, y) => {
                return (
                    <a name={x.sectionVideoTitle} key={x.sectionVideoId}>
                        <div className="videotile" >
                            <div className="videotitle">{x.sectionVideoTitle}</div>
                            <div className="videobody">
                                <ReactPlayer
                                    url={x.videoUrl}
                                    style={videoStyle}
                                    className="reactplayer"
                                />
                                <div className="videodesc">
                                    <div>{x.sectionVideoText}</div>
                                    {/* <div><button></button></div> */}
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })
            return (
                <a name={e.sectionTitle} key={e.sectionId} className="sectionbodycontainer">
                    <div className="bodysectiontitle">{this.props.match.params.chapter}.{e.sectionNumber} {e.sectionTitle}</div>
                    <div className="bodyvideocontainer">
                        {bodyVideoMap}
                    </div>
                </a>
            )
        }) : null

        return (
            <div className="singlechapterbody">
                <div className="booknavcontainer">
                    {navMap}
                </div>
                <div className="singlechaptercontent">
                    {bodyMap}
                    <Footer />
                </div>
            </div>
        )
    }
}

export default SingleChapter;