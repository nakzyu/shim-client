import React, {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useContext
} from "react";

import { useParams } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import "./UpdatePost.css";

const UpdatePost = props => {
  const auth = useContext(AuthContext);
  const postId = useParams().postId;
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const fetchPosts = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/${postId}`
      );
      setLoadedPosts(responseData.posts);
    } catch (err) {}
  }, [postId, sendRequest]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const postUpdateHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${postId}`,
        "PATCH",
        JSON.stringify({
          description: formState.inputs.description.value
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json"
        }
      );
      fetchPosts();
    } catch (err) {}
  };

  console.log(loadedPosts);
  return (
    <Fragment>
      {loadedPosts && (
        <div className="upadte-post">
          <form className="update-post_form form">
            <div className="update-post_description">
              <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Content required"
                onInput={inputHandler}
              />
            </div>

            <ul
              className="update-post_edit"
              type="submit"
              onClick={postUpdateHandler}
            >
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
          </form>
          <div className="update-post_images">
            <img className="update-post_image" src={loadedPosts.image} alt="" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdatePost;
