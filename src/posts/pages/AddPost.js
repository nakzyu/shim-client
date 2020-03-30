import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validators";
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
      await sendRequest("http://localhost:5000/api/posts", "POST", formData, {
        Authorization: "Bearer " + auth.token
      });

      history.push("/");
    } catch (err) {}
  };

  return (
    <form className="form-control add-place-form" onSubmit={postSubmitHandler}>
      <ImageUpload id="image" onInput={inputHandler} />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Content required"
        onInput={inputHandler}
      />
      <button className="submit" type="submit">
        SUBMIT
      </button>
    </form>
  );
};
export default AddPost;
