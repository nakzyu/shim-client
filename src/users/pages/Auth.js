import React, { useState } from "react";
import "./Auth.css";
import Input from "../../shared/components/FormElements/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";

const Auth = () => {
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

  return (
    <div className="auth-container">
      <div className="auth-side">
        <img
          src={require("../../assets/modern-building-3034343.jpg")}
          alt="building"
        />
      </div>
      <div className="auth-form">
        <div className="auth-logo">shim</div>
        <form onSubmit={console.log(formState)}>
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
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <button type="submit">submit</button>
        </form>
        <button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
