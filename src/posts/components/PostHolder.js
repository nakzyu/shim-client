import React, { useState, Fragment } from "react";
import "./PostHolder.css";
import Modal from "../../shared/components/UIElements/Modal";

const PostHolder = props => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandelr = () => {
    setShowModal(true);
  };

  const closeModalHandelr = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <div className="post-holder" onClick={openModalHandelr}>
        <img src={`${props.imageUrl}`} alt={`${props.postId}`} />
      </div>
      {showModal && (
        <Modal show={showModal} onCancel={closeModalHandelr} {...props} />
      )}
    </Fragment>
  );
};

export default PostHolder;
