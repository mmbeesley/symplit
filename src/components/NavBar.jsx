import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import book from '../images/icon-book.png';
import problem from '../images/icon-problem.png';
import about from '../images/icon-symplit.png';

export default class NavBar extends Component {
    
    render() {
        return (
            <div className="navcontainer">
                <div className="naviconcontainer">
                    <Link to='/books' >
                        <div className="navicon">
                            <img src={book} alt="Find Your Book" />
                        </div>
                    </Link>
                    <Link to='/problems' >
                        <div className="navicon">
                            <img src={problem} alt="Practice" />
                        </div>
                    </Link>
                    <Link to='/about' >
                        <div className="navicon">
                            <img src={about} alt="About" />
                        </div>
                    </Link>
                </div>
                <div className="navlinkcontainer">
                    <Link to='/books' >
                        <div className="navlink">Find Your Book</div>
                    </Link>
                    <Link to='/problems'>
                        <div className="navlink">Practice</div>
                    </Link>
                    <Link to='/about'>
                        <div className="navlink">About</div>
                    </Link>
                </div>
            </div>
        )
    }
}