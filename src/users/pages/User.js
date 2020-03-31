import React, { Fragment, useEffect, useCallback, useState } from "react";
import UserProfile from "../components/UserProfile";
import PostList from "../../posts/components/PostList";
import { useParams } from "react-router";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const User = () => {
  const userId = useParams().userId;

  const [loadedUser, setLoadedUser] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchUser = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${userId}`
      );

      setLoadedUser(responseData);
    } catch (err) {}
  }, [userId, sendRequest]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <UserProfile
        userId={userId}
        loadedUser={loadedUser}
        fetchUser={fetchUser}
      />
      <PostList userId={userId} fetchUser={fetchUser} />
    </Fragment>
  );
};

export default User;
