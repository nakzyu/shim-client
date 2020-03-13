import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import PostsList from "../src/posts/pages/PostList";
import User from "../src/users/pages/User";
import AddPost from "../src/posts/pages/AddPost";
import Auth from "../src/users/pages/Auth";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <main className="center main-app">
        <Switch>
          <Route path="/addPost" exact>
            <MainNavigation />
            <AddPost />
          </Route>
          <Route path="/" exact>
            <MainNavigation />
            <PostsList />
          </Route>
          <Route path="/user/:userId" exact>
            <MainNavigation />
            <User />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
