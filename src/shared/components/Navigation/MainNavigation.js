import React, { Fragment } from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = props => {
  return (
    <Fragment>
      <MainHeader>
        <div className="logo-main">shim</div>
        <NavLinks />
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
