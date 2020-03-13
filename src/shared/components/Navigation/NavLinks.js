import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = props => {
  return (
    <ul className="nav-links">
      <NavLink to="/user/u1" exact>
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
      </NavLink>
      <NavLink to="/" exact>
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
      </NavLink>
      <NavLink to="/addPost" exact>
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
      </NavLink>
      <NavLink to="/auth" exact>
        <li className="nav-logOut center">
          <img
            src={require("../../../assets/iconmonstr-door-7-64.png")}
            alt="logOut"
          />
          <img
            src={require("../../../assets/iconmonstr-door-5-64.png")}
            alt="logOut"
          />
        </li>
      </NavLink>
    </ul>
  );
};

export default NavLinks;
