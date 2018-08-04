import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo-header.png";

export default function Header() {
  return (
    <div className="mainheader">
      <div className="headItem" />
      <Link to="/">
        <img src={logo} alt="Symplit" className="headItem" />
      </Link>
      <div className="headItem" />
    </div>
  );
}
