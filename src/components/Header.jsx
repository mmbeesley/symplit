import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../images/logo-header.png'

function Header(props){
    let accountLink = props.user.auth_id ? <Link to='/account'>Your Account</Link> : <a href={process.env.REACT_APP_LOGIN}>Login</a>
    return(
        <div className='mainheader'>
            <Link to='/'><img src={logo} className='headItem'/></Link>
            <div className='headItem'>
                {accountLink}
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);