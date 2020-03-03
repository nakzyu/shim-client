import React from "react";

import "./NavLinks.css";

const NavLinks = props => {
  return (
    <ul className="nav-links">
      <li className="nav-user center">
        <img
          src={require("../../../assets/iconmonstr-user-20-64.png")}
          alt="user"
        />
        <img
          src={require("../../../assets/iconmonstr-user-20-64.png")}
          alt="user"
        />
      </li>
      <li className="nav-navigator center">
        <img
          src={require("../../../assets/iconmonstr-compass-12-64.png")}
          alt="navigator"
        />
        <img
          src={require("../../../assets/iconmonstr-compass-11-64.png")}
          alt="navigator"
        />
      </li>
      <li className="nav-addPost center">
        <img
          src={require("../../../assets/iconmonstr-plus-6-64.png")}
          alt="addPost"
        />
        <img
          src={require("../../../assets/iconmonstr-plus-5-64.png")}
          alt="addPost"
        />
      </li>
      <li className="nav-logOut center">
        <img
          src={require("../../../assets/iconmonstr-door-8-64.png")}
          alt="logOut"
        />
        <img
          src={require("../../../assets/iconmonstr-door-6-64.png")}
          alt="logOut"
        />
      </li>
    </ul>
  );
};

export default NavLinks;
