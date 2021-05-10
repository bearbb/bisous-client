import React, { useState, useEffect, useRef } from "react";
import "./styles/Login.css";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const userNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.toString());
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.toString());
  };
  const signInHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    //TODO: perform a logic checking on username and password before send to api

    //clear password field after click
    setPassword("");
    passwordInputRef.current!.value = "";
  };
  return (
    <div id="body">
      <div id="nav-bar"></div>
      <div id="login-field">
        <div id="input-field">
          <div id="header-field">
            <h1>Sign in</h1>
          </div>
          <label htmlFor="username-input">Username</label>
          <input
            type="text"
            id="username-input"
            onChange={(e) => {
              userNameHandler(e);
            }}
          />
          <label htmlFor="password-input">Password</label>
          <input
            type="password"
            id="password-input"
            ref={passwordInputRef}
            onChange={(e) => {
              passwordHandler(e);
            }}
          />
          <button id="sign-in-button" onClick={(e) => signInHandler(e)}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
