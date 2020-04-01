import React, { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from "../../shared/util/validators";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./AddPost.css";

const AddPost = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );
  const postSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", formState.inputs.description.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);
      formData.append("date", Date.now());
      console.log(formData);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token
        }
      );

      history.push("/");
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        className="form-control add-place-form"
        onSubmit={postSubmitHandler}
      >
        <ImageUpload id="image" onInput={inputHandler} addPost="true" />
        <div className="add-place-description">
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(300)]}
            errorText="Content required(less than 300 characters)"
            onInput={inputHandler}
          />
        </div>
        <button className="submit" type="submit">
          SUBMIT
        </button>
      </form>
    </Fragment>
  );
};
export default AddPost;
