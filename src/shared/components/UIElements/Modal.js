import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";

const DUMMY = {
  postId: "p1",
  date: "2020-03-03",
  description: "Cigar1",
  imageUrl:
    "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  creator: "u1"
};

const ModalOverlay = props => {
  const content = (
    <div className="modal centered">
      <div className="modal-wrapper">
        <img
          className="modal-image"
          src={`${props.imageUrl}`}
          alt={props.postId}
        />
        <div className="modal-content">
          {props.postId}
          {props.date}
          {props.description}
          {props.creator}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.getElementById("modal-hook"));
};

const Modal = props => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </Fragment>
  );
};

export default Modal;
