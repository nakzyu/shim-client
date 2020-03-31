import React, {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useContext
} from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import "./UpdatePost.css";

const UpdatePost = props => {
  const history = useHistory();
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
      history.push("/");
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {loadedPosts && (
        <div className="update-post">
          <div className="update-post_images">
            <img src={loadedPosts.image} alt="" />
          </div>
          <form className="update-post_form form" onSubmit={postUpdateHandler}>
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
            <button className="submit" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UpdatePost;
