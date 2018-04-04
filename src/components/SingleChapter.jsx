import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import {Player} from 'video-react';

class SingleChapter extends Component {
    constructor() {
        super();

        this.state = {
            sections: []
        }
    }

    componentDidMount() {
        let chapterId = this.props.match.params.chapter
        axios.get('/api/sections/' + chapterId).then(sections => {
            this.setState({
                sections: sections.data
            })
        })
    }

    render() {

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
                    <div className="sectiontitle">{this.props.match.params.chapter}.{e.sectionNumber} {e.sectionTitle}</div>
                    <ul className="videolist">
                        {videoMap}
                    </ul>
                </div>
            )
        }) : null

        let bodyMap = this.state.sections.length > 0 ? this.state.sections.map((e, i) => {
            let bodyVideoMap = e.sectionVideos.map((x, y) => {
                return (
                    <a className="videotile" name={x.sectionVideoTitle}>
                        <div className="videotitle">{x.sectionVideoTitle}</div>
                        <div className="videobody">
                            <Player
                                playsinline
                                poster={x.videoThumbnail}
                                src={x.videoUrl}
                            />
                            <div className="videodesc">

                            </div>
                        </div>
                    </a>
                )
            })
            return (
                <div key={e.sectionId} className="sectionbodycontainer">
                    <div className="bodysectiontitle">{this.props.match.params.chapter}.{e.sectionNumber} {e.sectionTitle}</div>
                    <div className="bodyvideocontainer">
                        {bodyVideoMap}
                    </div>
                </div>
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