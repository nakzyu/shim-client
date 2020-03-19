import React, { useEffect, useState, useCallback, Fragment } from "react";
import PostHolder from "./PostHolder";
import "./PostList.css";
import DUMMY_POST from "../../DUMMY_POST";

const PostList = () => {
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

      DUMMY_POST.forEach((item, index) => {
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

      DUMMY_POST.forEach((item, index) => {
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

      DUMMY_POST.forEach((item, index) => {
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

      DUMMY_POST.forEach((item, index) => {
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

  return <Fragment> {conditionalRender()}</Fragment>;
};

export default PostList;
