import React, { useEffect, useState, useCallback } from "react";
import PostHolder from "../components/PostHolder";
import "./PostList.css";
import DUMMY_POST from "../../DUMMY_POST";

const PostsList = () => {
  const [width, setWidth] = useState();
  const [column, setColumn] = useState();

  const updateWidth = useCallback(() => {
    setWidth(window.innerWidth);

    if (width > 1899) {
      return setColumn(4);
    }
    if (width > 1077) {
      return setColumn(3);
    }
    if (width > 594) {
      return setColumn(2);
    } else {
      return setColumn(1);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
  }, [updateWidth]);

  const conditionalRender = () => {
    if (column === 4) {
    }
  };

  return (
    <ul className="post-lists">
      {DUMMY_POST.map(item => (
        <PostHolder {...item} />
      ))}
    </ul>
  );
};

export default PostsList;
