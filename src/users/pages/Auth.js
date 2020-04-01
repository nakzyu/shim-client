import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  Fragment
} from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";
const Auth = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [authImage, setAuthImage] = useState(() => {
    if (window.innerWidth >= 768) return true;
    if (window.innerWidth < 768) return false;
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: "",
      isaValid: false
    },
    password: {
      value: "",
      isaValid: false
    }
  });

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
        auth.login(responseData.userId, responseData.token);
        history.push("/");
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.userId, responseData.token);
        history.push("/");
      } catch (err) {}
    }
  };

  const updateAuthImage = useCallback(() => {
    if (window.innerWidth >= 768) {
      setAuthImage(true);
    }
    if (window.innerWidth < 768) {
      setAuthImage(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateAuthImage);
  }, [updateAuthImage]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="auth-container">
        {isLoading && <LoadingSpinner asOverlay />}
        {authImage && (
          <div className="auth-side">
            <img
              src={require("../../assets/modern-building-3034343.jpg")}
              alt="building"
            />
          </div>
        )}
        <div>
          <div className="auth-logo">shim</div>
          <form className="auth-form" onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Nickname"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 6 characters."
              onInput={inputHandler}
            />
            <button className="submit" type="submit">
              SUBMIT
            </button>
          </form>
          <button className="switch" onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </button>
          <div className="auth-slogan">
            SHARE
            <br />
            YOUR
            <br />
            PHOTOS!
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
