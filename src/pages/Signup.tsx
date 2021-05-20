import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import "../styles/Signup.css";

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const rePasswordInputRef = useRef<HTMLInputElement>(null);
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.toString());
  };
  const userNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.toString());
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.toString());
  };
  const rePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(event.target.value.toString());
  };
  const signUpHandler = () => {
    //clear both password field
    setPassword("");
    passwordInputRef.current!.value = "";
    setRePassword("");
    rePasswordInputRef.current!.value = "";
  };
  return (
    <div id="body">
      <div id="nav-bar"></div>
      <div id="sign-up-field">
        <div id="input-field">
          <div id="header-field">
            <h1>Sign up</h1>
            <a href="">
              <span>Already have an account?</span>
              <br />
              <span>Sign in</span>
            </a>
          </div>
          <div className="other-method-sign-up">
            <span className="same-height-element-1 gg-sign-up input-field-button">
              <span className="gg-sign-up-content">
                <span>
                  <FontAwesomeIcon icon={faGoogle} size="lg" spin />
                </span>
                <span> </span>
                Sign up with Google
              </span>
            </span>
            <span className="same-height-element-1 fb-sign-up input-field-button">
              <span>
                <FontAwesomeIcon icon={faFacebookF} size="lg" spin />
              </span>
            </span>
          </div>
          <div className="credential-input">
            <div className="credential-input-label-container">
              <label htmlFor="username-input">Username</label>
            </div>
            <input
              className="same-height-element-1"
              type="text"
              id="username-input"
              onChange={(e) => {
                userNameHandler(e);
              }}
            />
            <div className="credential-input-label-container">
              <label htmlFor="username-input">Email</label>
            </div>
            <input
              className="same-height-element-1"
              type="text"
              id="username-input"
              onChange={(e) => {
                emailHandler(e);
              }}
            />
          </div>
          <div className="credential-input">
            <div className="credential-input-label-container">
              <label htmlFor="password-input">Password</label>
            </div>
            <input
              className="same-height-element-1"
              type="password"
              id="password-input"
              ref={passwordInputRef}
              onChange={(e) => {
                passwordHandler(e);
              }}
            />
            <div className="credential-input-label-container">
              <label htmlFor="password-input">Re-Confirm Password</label>
            </div>
            <input
              className="same-height-element-1"
              type="password"
              id="password-input"
              ref={rePasswordInputRef}
              onChange={(e) => {
                rePasswordHandler(e);
              }}
            />
          </div>
          <div className="submit-field">
            <span
              className="same-height-element-1 input-field-button"
              id="sign-up-button"
              onClick={signUpHandler}
            >
              <span>Sign up</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

//TODO: using react-router to navigate between pages
