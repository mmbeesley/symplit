import React from "react";
import { Link } from "react-router-dom";
import './GetStartedButton.css';

export default function GetStartedButton(props) {
  const {color} = props;
  return (
    <Link to="/books">
      <button className={`getstartedbutton${color}`}>Get Started</button>
    </Link>
  );
}
