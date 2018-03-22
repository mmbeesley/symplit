import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import book from '../images/icon-book.png';
import problem from '../images/icon-problem.png';
import about from '../images/icon-symplit.png';

export default class NavBar extends Component {
    render() {
        return (
            <div className="navcontainer">
                <Link to='/books'> <div className="navlink">
                    <div className="navlinkicon" ><img src={book} alt="Books" className="nav-icon"/></div>
                    <div className="navlinkdesc">Books</div>
                </div></Link>
                <Link to='/problems'> <div className="navlink">
                    <div className="navlinkicon" ><img src={problem} alt="Problems" className="nav-icon"/></div>
                    <div className="navlinkdesc">Problems</div>
                </div></Link>
                <Link to='/about'> <div className="navlink">
                    <div className="navlinkicon" ><img src={about} alt="About" className="nav-icon"/></div>
                    <div className="navlinkdesc">About</div>
                </div></Link>
            </div>
        )
    }
}