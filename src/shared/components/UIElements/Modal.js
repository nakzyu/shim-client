import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";

const ModalOverlay = props => {
  const content = (
    <div className="modal centered">
      <div className="modal-wrapper">
        <img className="modal-image" src={`${props.image}`} alt={props._id} />
        <div className="modal-content">
          {props.creator}
          {props.description}
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
