import React, { useContext, useEffect, useState, useCallback } from "react";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

const UserProfile = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

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
      fetchUser();
    } catch (err) {}
  };

  return (
    <div className="user-profile">
      {loadedUser && <img src={`${loadedUser.image}`} alt="userImage" />}

      <form onSubmit={imageSubmitHandler}>
        <ImageUpload id="image" onInput={inputHandler} />
        <button type="submit">image submit</button>
      </form>
    </div>
  );
};

export default UserProfile;
