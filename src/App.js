import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import PostsList from "../src/posts/pages/PostList";

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main className="center">
        <Switch>
          <Route path="/" exact>
            <PostsList />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
