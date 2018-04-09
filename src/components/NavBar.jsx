import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import book from '../images/icon-book.png';
import about from '../images/icon-symplit.png';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import axios from 'axios';

class NavBar extends Component {
    constructor(){
        super();

        this.state={
            user: {}
        }
    }

    componentDidMount() {
        // this.props.getUserInfo();
        axios.get('/auth/me').then(user => {
            console.log(user)
            this.setState({
                user: user.data
            })
        })
    }

    render() {
        return (
            <div className="navcontainer">
                <div className="naviconcontainer">
                    <Link to='/books' >
                        <div className="navicon">
                            <img src={book} alt="Find Your Book" />
                        </div>
                    </Link>
                    <Link to='/about' >
                        <div className="navicon">
                            <img src={about} alt="About" />
                        </div>
                    </Link>
                    <a href={process.env.REACT_APP_LOGIN} >
                        <div className="navicon">
                            <img src={about} alt="Login" />
                        </div>
                    </a>
                </div>
                <div className="navlinkcontainer">
                    <Link to='/books' >
                        <div className="navlink">Find Your Book</div>
                    </Link>
                    <Link to='/about'>
                        <div className="navlink">About</div>
                    </Link>
                    <a href={process.env.REACT_APP_LOGIN}>
                        <div className="navlink">Login</div>
                    </a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(NavBar);