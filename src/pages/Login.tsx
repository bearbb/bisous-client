import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/fontawesome-free-solid";
import { useHistory } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "styles/Login.css";
import axiosInstance from "Utility/axios";
const LoadingIcon = faSpinner as IconProp;
interface LoginProps {
  history: any;
}
interface UserCredential {
  username: string;
  password: string;
}
interface loginRes {
  token?: string;
  error?: {
    errorName: string;
    errorMsg: string;
  };
}

const axiosLogin = async (data: UserCredential): Promise<loginRes> => {
  try {
    const res = await axiosInstance.post("/users/login", data);
    return { token: res.data.token };
  } catch (error) {
    let errorData = error.response.data;
    return {
      error: { errorName: errorData.err.name, errorMsg: errorData.err.message },
    };
  }
};
export const Login: React.FC<LoginProps> = ({}) => {
  const history = useHistory();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [credentialIsEmpty, setCredentialIsEmpty] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginErr, setLoginErr] = useState<string>("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const userNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.toString());
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.toString());
  };
  const onEnterPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !credentialIsEmpty) {
      await signInHandler();
    }
  };
  useEffect(() => {
    if (userName === "" || password === "") {
      setCredentialIsEmpty(true);
    } else {
      setCredentialIsEmpty(false);
    }
    return () => {};
  }, [userName, password]);
  const credentialIsVerified = (data: UserCredential): boolean => {
    //TODO: add script detection to this function
    return true;
  };
  const navToSignUp = () => {
    history.push("/signup");
  };
  const signInHandler = async () => {
    //TODO: fix after login and push new history, component not render
    //TODO: perform a logic checking on username and password before send to api
    //Exec login
    //clear password field after click
    try {
      setIsFetching(true);
      let res = await axiosLogin({ username: userName, password });
      if (res.error) {
        setLoginErr(res.error.errorMsg);
      } else {
        // console.log(res.token);
        history.push("/");
        window.location.reload();
        // setLoginSuccess(true);
      }
      setPassword("");
      if (passwordInputRef.current !== null) {
        passwordInputRef.current.value = "";
      }
    } catch (error) {
      // console.error(error);
    }
    setIsFetching(false);
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
                  <FontAwesomeIcon icon={faGoogle} size="lg" />
                </span>
                <span> </span>
                Sign in with Google
              </span>
            </span>
            <span className="same-height-element-1 fb-sign-in input-field-button">
              <span>
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
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
          <div
            className="credential-input"
            onKeyPress={(e) => {
              onEnterPress(e);
            }}
          >
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
          <span className="login__error">{loginErr}</span>
          <div className="submit-field">
            {!isFetching ? (
              <span
                className="same-height-element-1 input-field-button signin__button--default"
                // id="sign-in-button"
                id={`${
                  credentialIsEmpty
                    ? "sign-in-button--disabled"
                    : "sign-in-button--enabled"
                }`}
                onClick={signInHandler}
              >
                <span>Sign in</span>
              </span>
            ) : (
              <FontAwesomeIcon
                icon={LoadingIcon}
                size="lg"
                spin
                color="#ffd6c6"
              ></FontAwesomeIcon>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
