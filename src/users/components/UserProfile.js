import React, { useEffect, useState, useCallback, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from "../../shared/util/validators";

import { AuthContext } from "../../shared/context/auth-context";
import ProfileModal from "../../shared/components/UIElements/ProfileModal";
import { useForm } from "../../shared/hooks/form-hook";
import "./UserProfile.css";

const UserProfile = props => {
  const auth = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loadedUser, setLoadedUser] = useState();
  const [formState, inputHandler] = useForm({
    description: {
      value: "",
      isaValid: false
    }
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const openModalHandelr = () => {
    setShowModal(true);
  };

  const closeModalHandelr = () => {
    setShowModal(false);
  };

  const descriptionSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/users/updateDescription/${auth.userId}`,
        "PATCH",
        JSON.stringify({
          description: formState.inputs.description.value
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json"
        }
      );
      fetchUser();
    } catch (err) {}
  };

  const FormHandler = async event => {
    event.preventDefault();
    if (showForm) {
      descriptionSubmitHandler(event);
      setShowForm(!showForm);
    }
    setShowForm(!showForm);
  };

  const fetchUser = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${props.userId}`
      );
      console.log(responseData);
      setLoadedUser(responseData);
    } catch (err) {}
  }, [props.userId, sendRequest]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="user-profile">
      <div className="user-profile_wrapper">
        {loadedUser && (
          <img
            className="user-profile_image"
            src={`${loadedUser.image}`}
            alt="userImage"
            onClick={openModalHandelr}
          />
        )}
        {showModal && (
          <ProfileModal
            show={showModal}
            onCancel={closeModalHandelr}
            {...props}
          />
        )}
        <div className="user-profile_status">
          <div className="user-profile_nickname">
            {loadedUser && loadedUser.name}
          </div>
          <div className="user-profile_posts">
            {loadedUser && loadedUser.posts.length} post
            {loadedUser && loadedUser.posts.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>
      <form
        className="user-profile_description"
        onSubmit={descriptionSubmitHandler}
      >
        {showForm ? (
          <Input
            element="input"
            id="description"
            type="text"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(26)]}
            errorText="Please enter content"
            onInput={inputHandler}
          />
        ) : (
          <div className="user-profile_description_message">
            {loadedUser && loadedUser.description}
          </div>
        )}
        {props.userId === auth.userId && (
          <ul className="user-profile_edit" type="submit" onClick={FormHandler}>
            <li>
              <img
                src={require("../../assets/iconmonstr-pencil-5-32.png")}
                alt="edit"
              />
              <img
                src={require("../../assets/iconmonstr-pencil-4-32.png")}
                alt="edit"
              />
            </li>
          </ul>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
