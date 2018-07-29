import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mainfooter">
      <div className="footerlinks">
        <Link to="/about/terms">Terms & Conditions</Link>
        <div>|</div>
        <Link to="/about/privacy">Privacy Policy</Link>
        <div>|</div>
        <Link to="/about/contact">Contact Us</Link>
      </div>
      <div className="footerlinks">
        <div>© Copyright 2017 Symplit</div>
        <div>|</div>
        <div>All rights reserved</div>
      </div>
    </div>
  );
}
