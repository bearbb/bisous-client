import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
interface LoginProps {}
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
    const res = await instance.post("/users/login", data);
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
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [credentialIsEmpty, setCredentialIsEmpty] = useState<boolean>(true);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const userNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.toString());
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.toString());
  };
  const onEnterPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("isEmpty", credentialIsEmpty);
    if (event.key === "Enter" && !credentialIsEmpty) {
      console.log(
        `%cNhan cd`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
      await signInHandler();
    } else {
      console.log(
        `%cEnter cái cc`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
    }
  };
  useEffect(() => {
    console.log(
      `%cPassword: ${password}`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    return () => {};
  }, [password]);
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
  useEffect(() => {
    console.log(
      `%c${isLogin}`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    return () => {};
  }, [isLogin]);
  const signInHandler = async () => {
    //TODO: perform a logic checking on username and password before send to api
    //Exec login
    //clear password field after click
    try {
      setIsLogin(true);
      let res = await axiosLogin({ username: userName, password });
      if (res.error) {
        console.error(res.error);
      } else {
        console.log(res.token);
        history.push("/");
      }
      setIsLogin(false);
      setPassword("");
      passwordInputRef.current!.value = "";
    } catch (error) {
      console.error(error);
    }
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
