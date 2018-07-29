/** NPM Modules **/
import React from "react";
import { Link } from "react-router-dom";

/** Exported Component */
export default function NavBarLink(props) {
  const { path, asset, alt } = props;

  return (
    <Link to={path}>
      <div className="navicon">
        <img src={asset} alt={alt} />
        <div className="navlink">{alt}</div>
      </div>
    </Link>
  );
}
