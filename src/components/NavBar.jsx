import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <div className="navcontainer">
                <Link to='/books'> <div className="navlink">
                    <div className="navlinkicon"></div>
                    <div className="navlinkdesc">Books</div>
                </div></Link>
                <Link to='/problems'> <div className="navlink">
                    <div className="navlinkicon"></div>
                    <div className="navlinkdesc">Problems</div>
                </div></Link>
                <Link to='/'> <div className="navlink">
                    <div className="navlinkicon"></div>
                    <div className="navlinkdesc">Search</div>
                </div></Link>
                <Link to='/about'> <div className="navlink">
                    <div className="navlinkicon"></div>
                    <div className="navlinkdesc">About</div>
                </div></Link>
            </div>
        )
    }
}