import React, { Component } from 'react';

export default class About extends Component {
    render() {
        return (
            <div>
                <div className="booknavcontainer">
                    <a href='#ourmission'>
                        <div className="sectiontitle">
                            Our Mission
                        </div>
                    </a>
                </div>
                <div className="singlechaptercontent">
                    <h1>
                        About Symplit
                    </h1>
                    <a name='ourmission' className="sectionbodycontainer">
                        <div className="bodysectiontitle">Our Mission</div>
                        <div className="bodyvideocontainer">
                            
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}