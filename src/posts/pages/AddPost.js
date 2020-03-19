import React from "react";

import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./AddPost.css";

const AddPost = () => {
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
      formData.append("creator", "5e6dc9f35f5489354c66246d");
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/posts", "POST", formData);
    } catch (err) {}
  };

  return (
    <form className="place-form" onSubmit={postSubmitHandler}>
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Content required"
        onInput={inputHandler}
      />
      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      />
      <button type="submit">submit</button>
    </form>
  );
};
export default AddPost;
