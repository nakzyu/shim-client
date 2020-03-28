import React, { useState, Fragment } from "react";
import "./PostHolder.css";
import Modal from "../../shared/components/UIElements/Modal";

const PostHolder = props => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandelr = () => {
    setShowModal(true);
    console.log(props);
    window.history.replaceState(null, null, `/post/${props._id}`);
  };

  const closeModalHandelr = () => {
    setShowModal(false);
    window.history.replaceState(null, null, "/");
  };

  return (
    <Fragment>
      <div className="post-holder" onClick={openModalHandelr}>
        <img src={`${props.image}`} alt={`${props.postId}`} />
      </div>
      {showModal && (
        <Modal show={showModal} onCancel={closeModalHandelr} {...props} />
      )}
    </Fragment>
  );
};

export default PostHolder;
