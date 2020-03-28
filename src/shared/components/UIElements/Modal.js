import React, { Fragment, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";

import { useHttpClient } from "../../hooks/http-hook";

const ModalOverlay = props => {
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const fetchUser = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${props.creator}`
      );
      console.log(responseData);
      setLoadedUser(responseData);
    } catch (err) {}
  }, [sendRequest, props.creator]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const content = (
    <div className="modal centered">
      <div className="modal-wrapper">
        <img className="modal-image" src={`${props.image}`} alt="" />
        <div className="modal-content">
          <div className="modal-content-img_name">
            <Link to={`/user/${props.creator}`}>
              <img
                className="modal-content-profile_img"
                src={loadedUser && loadedUser.image}
                alt=""
              />
            </Link>

            <Link to={`/user/${props.creator}`}>
              <div className="modal-content-profile_name">
                {loadedUser && loadedUser.name}
              </div>
            </Link>
          </div>

          <div>description</div>
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
