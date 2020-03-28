import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useParams
} from "react";
import PostHolder from "./PostHolder";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./PostList.css";

const PostList = props => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (props.userId) {
          const responseData = await sendRequest(
            `http://localhost:5000/api/posts/user/${props.userId}`
          );
          console.log(responseData);
          setLoadedPosts(responseData.posts);
        } else {
          const responseData = await sendRequest(
            `http://localhost:5000/api/posts`
          );
          setLoadedPosts(responseData.post);
        }
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest, props.userId]);

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

  const conditionalRender = () => {
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
              <PostHolder {...item} />
            ))}
          </div>
          <div className="post-lists-line2">
            {line2.map(item => (
              <PostHolder {...item} />
            ))}
          </div>
          <div className="post-lists-line3">
            {line3.map(item => (
              <PostHolder {...item} />
            ))}
          </div>
          <div className="post-lists-line4">
            {line4.map(item => (
              <PostHolder {...item} />
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
              <PostHolder {...item} />
            ))}
          </div>
          <div className="post-lists-line2">
            {line2.map(item => (
              <PostHolder {...item} />
            ))}
          </div>
          <div className="post-lists-line3">
            {line3.map(item => (
              <PostHolder {...item} />
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
              <PostHolder {...item} />
            ))}
          </div>
          <div className="post-lists-line2">
            {line2.map(item => (
              <PostHolder {...item} />
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
              <PostHolder {...item} />
            ))}
          </div>
        </div>
      );
    } else return;
  };

  return <Fragment> {loadedPosts && conditionalRender()}</Fragment>;
};

export default PostList;