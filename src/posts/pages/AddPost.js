import React from "react";

import Input from "../../shared/components/FormElements/Input";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validators";

import "./AddPost.css";

const AddPost = () => {
  return (
    <div className="place-form">
      <Input
        id="content"
        element="textarea"
        label="Content"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Content required"
        onInput={() => {
          console.log("input");
        }}
      />
    </div>
  );
};
export default AddPost;
