import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <NavLink to={`/user/${auth.userId}`} exact>
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
      )}
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
      {auth.isLoggedIn && (
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
      )}

      {auth.isLoggedIn ? (
        <div to="/" exact onClick={auth.logout}>
          <li className="nav-logOut center" onClick={auth.logout}>
            <img
              src={require("../../../assets/iconmonstr-door-8-64.png")}
              alt="logout"
            />
            <img
              src={require("../../../assets/iconmonstr-door-6-64.png")}
              alt="logout"
            />
          </li>
        </div>
      ) : (
        <NavLink to="/auth" exact>
          <li className="nav-logOut center">
            <img
              src={require("../../../assets/iconmonstr-door-7-64.png")}
              alt="logIn"
            />
            <img
              src={require("../../../assets/iconmonstr-door-5-64.png")}
              alt="logIn"
            />
          </li>
        </NavLink>
      )}
    </ul>
  );
};

export default NavLinks;
