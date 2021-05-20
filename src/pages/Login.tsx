import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const history = useHistory();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const userNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.toString());
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.toString());
  };
  const navToSignUp = () => {
    history.push("/signup");
  };
  const signInHandler = () => {
    //TODO: perform a logic checking on username and password before send to api

    //clear password field after click
    console.log(
      `%cClicked`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    setPassword("");
    passwordInputRef.current!.value = "";
  };
  return (
    <div id="body">
      <div id="nav-bar"></div>
      <div id="login-field">
        <div id="login-input-field">
          <div id="header-field">
            <h1>Sign in</h1>
            <a onClick={navToSignUp}>
              <span>No account?</span>
              <br />
              <span>Sign up</span>
            </a>
          </div>
          <div className="other-method-sign-in">
            <span className="same-height-element-1 gg-sign-in input-field-button">
              <span className="gg-sign-in-content">
                <span>
                  <FontAwesomeIcon icon={faGoogle} size="lg" spin />
                </span>
                <span> </span>
                Sign in with Google
              </span>
            </span>
            <span className="same-height-element-1 fb-sign-in input-field-button">
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
          </div>
          <div className="credential-input">
            <div className="credential-input-label-container forgot-password-container">
              <label htmlFor="password-input">Password</label>
              <a href="">
                <span>Forgot Password?</span>
              </a>
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
          </div>
          <div className="submit-field">
            <span
              className="same-height-element-1 input-field-button"
              id="sign-in-button"
              onClick={signInHandler}
            >
              <span>Sign in</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
