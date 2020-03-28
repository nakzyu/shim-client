import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Explore from "./posts/pages/Explore";
import User from "../src/users/pages/User";
import AddPost from "../src/posts/pages/AddPost";
import Auth from "../src/users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import "./App.css";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainNavigation />
          <Explore />
        </Route>
        <Route path="/user/:userId">
          <MainNavigation />
          <User />
        </Route>
        <Route path="/addPost" exact>
          <MainNavigation />
          <AddPost />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainNavigation />
          <Explore />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId: userId,
        login,
        logout
      }}
    >
      <BrowserRouter>
        <main className="center main-app">{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
