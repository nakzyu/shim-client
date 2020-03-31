import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = props => {
  return (
    <Fragment>
      <MainHeader>
        <Link to="/">
          <div className="logo-main">shim</div>
        </Link>
        <NavLinks />
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
