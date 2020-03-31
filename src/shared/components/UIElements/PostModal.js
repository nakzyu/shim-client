import React, {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useContext
} from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import "./PostModal.css";
import Backdrop from "./Backdrop";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../../context/auth-context";
import block from "../../hooks/block-hook";
import { useHttpClient } from "../../hooks/http-hook";

const ModalOverlay = props => {
  block();
  const auth = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();
  const [whoLikedThisPost, setWhoLikedThisPost] = useState(props.like);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchUser = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${props.creator}`
      );

      setLoadedUser(responseData);
      console.log(responseData);
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

      props.deleteLoadedPost(props._id);
      props.onCancel();
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

    props.holderLikeHandler(auth.userId);
    setWhoLikedThisPost(responseData.post.likedBy);
  };

  const postUnLikeHandler = async () => {
    const responseData = await sendRequest(
      `http://localhost:5000/api/posts/unLike/${props._id}`,
      "DELETE",
      JSON.stringify({
        userId: auth.userId
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token
      }
    );

    setWhoLikedThisPost(responseData.post.likedBy);
    props.holderUnLikeHandler(auth.userId);
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const date = () => {
    const date = Date.now();
    const calcDate = date - props.date;
    const calcDay = Math.floor(calcDate / 86400000);
  };

  const content = (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="post-modal centered">
        <div className="post-modal-wrapper">
          <img className="post-modal-image" src={`${props.image}`} alt="" />
          <div className="post-modal-content">
            <div className="post-modal-content-img_name">
              <Link to={`/user/${props.creator}`}>
                <img
                  className="post-modal-content-profile_img"
                  src={loadedUser && loadedUser.image}
                  alt=""
                />
              </Link>

              <Link to={`/user/${props.creator}`}>
                <div className="post-modal-content-profile_name">
                  {loadedUser && loadedUser.name}
                </div>
              </Link>
            </div>

            <div className="post-modal-description">{props.description}</div>
            <div className="post-modal-date">{date()}</div>
            <div className="post-modal-function">
              {auth.userId === props.creator ? (
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
              ) : (
                <li>
                  <img
                    className="white"
                    src={require("../../../assets/white.jpg")}
                    alt="edit"
                  />
                </li>
              )}

              <div
                className="post-modal-function_delete"
                onClick={deleteHandler}
              >
                {auth.userId === props.creator ? (
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
                ) : (
                  <li>
                    <img
                      className="white"
                      src={require("../../../assets/white.jpg")}
                      alt="edit"
                    />
                  </li>
                )}
              </div>
              {whoLikedThisPost.find(id => id === auth.userId) ? (
                <div
                  className="post-modal-function_liked"
                  onClick={postUnLikeHandler}
                >
                  <div>
                    <img
                      src={require("../../../assets/iconmonstr-favorite-1-32.png")}
                      alt="edit"
                    />
                    <div className="likes-how-many">
                      {whoLikedThisPost.length === 0
                        ? null
                        : whoLikedThisPost.length}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="post-modal-function_not-liked"
                  onClick={postLikeHandler}
                >
                  <div>
                    <img
                      src={require("../../../assets/iconmonstr-favorite-2-32.png")}
                      alt="edit"
                    />
                    <div className="likes-how-many">
                      {whoLikedThisPost.length === 0
                        ? null
                        : whoLikedThisPost.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return createPortal(content, document.getElementById("post-modal-hook"));
};

const PostModal = props => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} onCancel={props.onCancel} />
    </Fragment>
  );
};

export default PostModal;
