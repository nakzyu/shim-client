import React, { Fragment, useContext } from "react";
import { createPortal } from "react-dom";
import block from "../../hooks/block-hook";
import "./ProfileModal.css";
import Backdrop from "./Backdrop";
import ImageUpload from "../FormElements/ImageUpload";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../../context/auth-context";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

const ModalOverlay = props => {
  block();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const imageSubmitHandler = async event => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", formState.inputs.image.value);
      formData.append("creator", auth.userId);

      console.log(formData);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateImage/${auth.userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token
        }
      );
      props.fetchUser();
      props.onCancel();
    } catch (err) {}
  };

  const content = (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="post-modal center profileModal">
        <div className="post-modal-wrapper">
          <form onSubmit={imageSubmitHandler}>
            <ImageUpload id="image" onInput={inputHandler} />
            <button className="submit" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );

  return createPortal(content, document.getElementById("modal-hook"));
};

const ProfileModal = props => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </Fragment>
  );
};

export default ProfileModal;
