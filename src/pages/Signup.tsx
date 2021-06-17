import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/fontawesome-free-solid";
import "../styles/Signup.css";
import { useHistory } from "react-router";
import axiosInstance from "Utility/axios";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
const LoadingIcon = faSpinner as IconProp;

interface SignupProps {}

interface SignupData {
  username: string;
  email: string;
  password: string;
}
interface SignupRes {
  successMsg?: string;
  error?: {
    errorMsg: string;
  };
}
const signupCall = async (data: SignupData): Promise<SignupRes> => {
  let res: SignupRes = {};
  try {
    let resp = await axiosInstance.post("/users/signup", data);
    res.successMsg = resp.data.message;
  } catch (err) {
    res.error = { errorMsg: err.response.data.error };
  }
  return res;
};

export const Signup: React.FC<SignupProps> = ({}) => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [passwordIsMatch, setPasswordIsMatch] = useState<boolean>(true);
  const [credentialIsEmpty, setCredentialIsEmpty] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [signupErr, setSignupErr] = useState<string>("");
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
  const navToLogin = () => {
    history.push("/login");
  };
  useEffect(() => {
    if (password === rePassword) {
      setPasswordIsMatch(true);
    } else {
      setPasswordIsMatch(false);
    }
    return () => {};
  }, [password, rePassword]);
  useEffect(() => {
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      rePassword === ""
    ) {
      setCredentialIsEmpty(true);
    } else setCredentialIsEmpty(false);
    return () => {};
  }, [userName, email, password, rePassword]);
  const signUpHandler = async () => {
    //call api
    if (passwordIsMatch && !credentialIsEmpty) {
      setIsFetching(true);
      const signupRes = await signupCall({
        username: userName,
        email,
        password,
      });
      if (signupRes.error) {
        setSignupErr(signupRes.error.errorMsg);
        console.log(signupErr);
      } else {
        console.log(signupRes.successMsg);
        navToLogin();
      }
      //clear both password field
      setIsFetching(false);
      setPassword("");
      setRePassword("");
      if (rePasswordInputRef.current && passwordInputRef.current) {
        rePasswordInputRef.current.value = "";
        passwordInputRef.current.value = "";
      }
      // rePasswordInputRef.current!.value = "";
      // passwordInputRef.current.value = "";
    } else {
      console.log(
        `%cNhấn nhấn cái bím`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
    }
  };
  return (
    <div id="body">
      <div id="nav-bar"></div>
      <div id="sign-up-field">
        <div id="input-field">
          <div id="header-field">
            <h1>Sign up</h1>
            <a onClick={navToLogin}>
              <span>Already have an account?</span>
              <br />
              <span>Sign in</span>
            </a>
          </div>
          <div className="other-method-sign-up">
            <span className="same-height-element-1 gg-sign-up input-field-button">
              <span className="gg-sign-up-content">
                <span>
                  <FontAwesomeIcon icon={faGoogle} size="lg" />
                </span>
                <span> </span>
                Sign up with Google
              </span>
            </span>
            <span className="same-height-element-1 fb-sign-up input-field-button">
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
              className={`same-height-element-1 ${
                passwordIsMatch ? "" : "password__input--red"
              }`}
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
              className={`same-height-element-1 ${
                passwordIsMatch ? "" : "password__input--red"
              }`}
              type="password"
              id="password-input"
              ref={rePasswordInputRef}
              onChange={(e) => {
                rePasswordHandler(e);
              }}
            />
          </div>
          <div className="submit-field">
            {!isFetching ? (
              <span
                className={`same-height-element-1 input-field-button signup__button--default`}
                id={`${
                  credentialIsEmpty
                    ? "signup__button--disabled"
                    : "signup__button--enabled"
                }`}
                onClick={() => {
                  signUpHandler();
                }}
              >
                <span>Sign up</span>
              </span>
            ) : (
              <FontAwesomeIcon
                icon={LoadingIcon}
                spin
                size="lg"
                color="#ffd6c6"
              ></FontAwesomeIcon>
            )}
            <span className="submit__error">{signupErr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

//TODO: using react-router to navigate between pages
