import React, { useState, Fragment, useEffect } from "react";
import "./PostHolder.css";
import PostModal from "../../shared/components/UIElements/PostModal";

const PostHolder = props => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(false);
  const [likedBy, setLikedBy] = useState([...props.likedBy]);

  const urlNow = window.location.href;

  useEffect(() => {
    setUrl(urlNow);
  }, []);

  const openModalHandelr = () => {
    console.log(url);
    setShowModal(true);
    console.log(props);
    window.history.pushState(null, null, `/post/${props._id}`);
  };

  const closeModalHandelr = () => {
    setShowModal(false);
    window.history.replaceState(null, null, `${url}`);
  };

  const holderLikeHandler = id => {
    setLikedBy(origin => [...origin, id]);
  };
  const holderUnLikeHandler = id => {
    const dIndex = likedBy.findIndex(origin => origin === id);
    likedBy.splice(dIndex, 1);
  };

  return (
    <Fragment>
      <div className="post-holder" onClick={openModalHandelr}>
        <img src={`${props.image}`} alt={`${props.postId}`} />
      </div>
      {showModal && (
        <PostModal
          show={showModal}
          onCancel={closeModalHandelr}
          like={likedBy}
          holderLikeHandler={holderLikeHandler}
          holderUnLikeHandler={holderUnLikeHandler}
          {...props}
        />
      )}
    </Fragment>
  );
};

export default PostHolder;
