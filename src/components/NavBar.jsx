import React, { Component } from "react";
import { Link } from "react-router-dom";
import book from "../images/icon-book.png";
import about from "../images/icon-symplit.png";
import { connect } from "react-redux";
import { getUserInfo } from "../ducks";

class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    let accountLink =
      this.props.user && !this.props.user.user_id ? (
        <a
          href={`${process.env.REACT_APP_LOGIN}?redirectPath=${
            this.props.path
          }`}
        >
          <div className="navlink">Login</div>
        </a>
      ) : (
        <Link to={`/account`}>
          <div className="navlink">Your Account</div>
        </Link>
      );
    return (
      <div className="navcontainer">
        <div className="naviconcontainer">
          <Link to="/books">
            <div className="navicon">
              <img src={book} alt="Find Your Book" />
            </div>
          </Link>
          <Link to="/about">
            <div className="navicon">
              <img src={about} alt="About" />
            </div>
          </Link>
          <a
            href={`${process.env.REACT_APP_LOGIN}?redirectPath=${
              this.props.path
            }`}
          >
            <div className="navicon">
              <img src={about} alt="Login" />
            </div>
          </a>
        </div>
        <div className="navlinkcontainer">
          <Link to="/books">
            <div className="navlink">Find Your Book</div>
          </Link>
          <Link to="/about">
            <div className="navlink">About</div>
          </Link>
          {accountLink}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    path: state.path
  };
}

export default connect(
  mapStateToProps,
  { getUserInfo }
)(NavBar);
