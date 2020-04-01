import React, { useEffect, useState, useCallback, Fragment } from "react";
import PostHolder from "./PostHolder";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import BottomScrollListener from "react-bottom-scroll-listener";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./PostList.css";

const PostList = props => {
  const [isEnd, setIsEnd] = useState(false);
  const [isPostExist, setIsPostExist] = useState(true);
  const [pageCount, setPageCount] = useState(2);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const deleteLoadedPost = useCallback(
    postId => {
      const dIndex = loadedPosts.findIndex(x => x._id === postId);
      const originPosts = loadedPosts.slice();
      originPosts.splice(dIndex, 1);
      setLoadedPosts(originPosts);
      if (props.userId) {
        props.fetchUser();
      }
    },
    [loadedPosts, props]
  );

  const fetchPosts = useCallback(async () => {
    try {
      if (props.userId) {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/user/${props.userId}`
        );
        console.log(responseData);
        setLoadedPosts(responseData.posts);
        if (responseData.posts.length === 0) {
          setIsPostExist(false);
        }
      } else {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts?page=1&limit=12`
        );

        setLoadedPosts(responseData.results);
      }
    } catch (err) {}
  }, [props.userId, sendRequest]);

  const params = useParams().userId;

  const fetchMorePosts = useCallback(async () => {
    if (params) return;

    if (isEnd) {
      return console.log("reached end!");
    }
    try {
      if (props.userId) {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/user/${props.userId}`
        );

        setLoadedPosts(responseData.posts);
      } else {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts?page=${pageCount}&limit=12`
        );

        if (responseData.results.length < 12) {
          setIsEnd(true);
        }
        setLoadedPosts(state => [...state, ...responseData.results]);
        setPageCount(state => (state += 1));
      }
    } catch (err) {}
  }, [isEnd, props.userId, sendRequest, pageCount, params]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const [column, setColumn] = useState(() => {
    if (window.innerWidtht >= 1900) {
      return 4;
    } else if (window.innerWidth >= 1078) {
      return 3;
    } else if (window.innerWidth >= 595) {
      return 2;
    } else {
      return 1;
    }
  });

  const updateColumn = useCallback(() => {
    let column;
    if (window.innerWidth >= 1900) {
      column = 4;
    } else if (window.innerWidth >= 1078) {
      column = 3;
    } else if (window.innerWidth >= 595) {
      column = 2;
    } else {
      column = 1;
    }
    setColumn(column);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateColumn);
  }, [updateColumn]);

  const conditionalRender = useCallback(() => {
    if (column === 4) {
      const line1 = [];
      const line2 = [];
      const line3 = [];
      const line4 = [];

      const lines = [line1, line2, line3, line4];

      loadedPosts.forEach((item, index) => {
        lines[index % 4].push(item);
      });

      return (
        <div className="post-lists">
          <div className="post-lists-line1">
            {line1.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
          <div className="post-lists-line2">
            {line2.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
          <div className="post-lists-line3">
            {line3.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
          <div className="post-lists-line4">
            {line4.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
        </div>
      );
    }
    if (column === 3) {
      const line1 = [];
      const line2 = [];
      const line3 = [];

      const lines = [line1, line2, line3];

      loadedPosts.forEach((item, index) => {
        lines[index % 3].push(item);
      });

      return (
        <div className="post-lists">
          <div className="post-lists-line1">
            {line1.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
          <div className="post-lists-line2">
            {line2.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
          <div className="post-lists-line3">
            {line3.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
        </div>
      );
    }

    if (column === 2) {
      const line1 = [];
      const line2 = [];

      const lines = [line1, line2];

      loadedPosts.forEach((item, index) => {
        lines[index % 2].push(item);
      });

      return (
        <div className="post-lists">
          <div className="post-lists-line1">
            {line1.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
          <div className="post-lists-line2">
            {line2.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
        </div>
      );
    }

    if (column === 1) {
      const line1 = [];

      const lines = [line1];

      loadedPosts.forEach((item, index) => {
        lines[index % 1].push(item);
      });

      return (
        <div className="post-lists">
          <div className="post-lists-line1">
            {line1.map(item => (
              <PostHolder {...item} deleteLoadedPost={deleteLoadedPost} />
            ))}
          </div>
        </div>
      );
    } else return;
  }, [loadedPosts, column, deleteLoadedPost]);

  useEffect(() => {
    conditionalRender();
  }, [conditionalRender]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <BottomScrollListener onBottom={fetchMorePosts}>
        {loadedPosts && conditionalRender()}
        {!isPostExist && (
          <div className="no-post-yet">
            This user haven't uploaded any post yet.
          </div>
        )}
      </BottomScrollListener>
    </Fragment>
  );
};

export default PostList;
