import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import PostsList from "../src/posts/pages/PostList";
import User from "../src/users/pages/User";

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main className="center">
        <Switch>
          <Route path="/" exact>
            <PostsList />
          </Route>
          <Route path="/user/:userId" exact>
            <User />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
