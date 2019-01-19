/** NPM Modules **/
import React from "react";
// import { Link } from "react-router-dom";

/** Exported Component **/
export default function AccountLink(props) {
  const { asset, redirect } = props;

  return (
    <a href={`${process.env.REACT_APP_LOGIN}?redirectPath=${redirect}`}>
      <div className="navicon">
        <img src={asset} alt="Login" />
        <div className="navlink">Login</div>
      </div>
    </a>
  );
}
