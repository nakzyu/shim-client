import React, { Fragment, useContext } from "react";
import { createPortal } from "react-dom";
import "./ProfileModal.css";
import Backdrop from "./Backdrop";
import ImageUpload from "../FormElements/ImageUpload";
import { AuthContext } from "../../context/auth-context";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

const ModalOverlay = props => {
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
        `http://localhost:5000/api/users/updateImage/${props.userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token
        }
      );
    } catch (err) {}
  };

  const content = (
    <div className="modal center profileModal">
      <div className="modal-wrapper">
        <form onSubmit={imageSubmitHandler}>
          <ImageUpload id="image" onInput={inputHandler} />
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
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
