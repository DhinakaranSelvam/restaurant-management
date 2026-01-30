import React from "react";

const NavLink = ({ children, onClick, className = "" }) => {
  return (
    <span className={`nav-link ${className}`} onClick={onClick}>
      {children}
      <span className="nav-link-underline"></span>
    </span>
  );
};

export default NavLink;
