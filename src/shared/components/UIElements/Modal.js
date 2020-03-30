import React, {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useContext
} from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";
import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const ModalOverlay = props => {
  const auth = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const fetchUser = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${props.creator}`
      );

      setLoadedUser(responseData);
    } catch (err) {}
  }, [sendRequest, props.creator]);

  const deleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${props._id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  const postLikeHandler = async () => {
    const responseData = await sendRequest(
      `http://localhost:5000/api/posts/like/${props._id}`,
      "POST",
      null,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token
      }
    );
    console.log(responseData);
  };

  const postUnLikeHandler = async () => {
    const responseData = await sendRequest(
      `http://localhost:5000/api/posts/like/${props._id}`,
      "DELETE",
      JSON.stringify({
        userId: auth.userId
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token
      }
    );
    console.log(responseData);
  };

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

          <div className="modal-description">{props.description}</div>
          <div className="modal-function">
            <Link to={`/updatePost/${props._id}`}>
              <li>
                <img
                  src={require("../../../assets/iconmonstr-pencil-5-32.png")}
                  alt="edit"
                />
                <img
                  src={require("../../../assets/iconmonstr-pencil-4-32.png")}
                  alt="edit"
                />
              </li>
            </Link>
            <div className="modal-function_delete" onClick={deleteHandler}>
              <li>
                <img
                  src={require("../../../assets/iconmonstr-x-mark-7-32.png")}
                  alt="edit"
                />
                <img
                  src={require("../../../assets/iconmonstr-x-mark-4-32.png")}
                  alt="edit"
                />
              </li>
            </div>
            <div className="modal-function_like" onClick={postLikeHandler}>
              <li>
                <img
                  src={require("../../../assets/iconmonstr-favorite-2-32.png")}
                  alt="edit"
                />
                <img
                  src={require("../../../assets/iconmonstr-favorite-1-32.png")}
                  alt="edit"
                />
              </li>
            </div>
          </div>
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
