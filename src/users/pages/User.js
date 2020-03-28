import React, { Fragment } from "react";
import UserProfile from "../components/UserProfile";
import PostList from "../../posts/components/PostList";
import { useParams } from "react-router";

const User = () => {
  const userId = useParams().userId;
  console.log(userId);
  return (
    <Fragment>
      <UserProfile userId={userId} />
      <PostList userId={userId} />
    </Fragment>
  );
};

export default User;
