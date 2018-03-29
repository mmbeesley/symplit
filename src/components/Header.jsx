import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../images/logo-header.png'

function Header(props){
    return(
        <div className='mainheader'>
            <div className="headItem"></div>
            <Link to='/'><img src={logo} alt="Symplit" className='headItem'/></Link>
            <div className="headItem"></div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);