import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/fontawesome-free-regular";
import {
  faBars,
  faPowerOff,
  faCog,
  faUserEdit,
} from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useHistory } from "react-router-dom";
import axiosInstance from "Utility/axios";

const MessageIcon = faEnvelope as IconProp;
const NotificationIcon = faBell as IconProp;
const OthersIcon = faBars as IconProp;
const LogoutIcon = faPowerOff as IconProp;
const SettingIcon = faCog as IconProp;
const UserEditIcon = faUserEdit as IconProp;

interface UtilityProps {}

export const Utility: React.FC<UtilityProps> = ({}) => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const history = useHistory();
  const messageHandler = () => {
    history.push("/direct");
  };
  const notificationHandler = () => {};
  const settingHandler = () => {
    setToggleDropdown(!toggleDropdown);
  };
  const logoutCall = async () => {
    let res;
    try {
      let logoutRes = await axiosInstance.get("/users/logout");
      res = logoutRes.data;
    } catch (err) {
      console.error(err);
      res = err.response;
    }
    return res;
  };
  const logoutHandler = async () => {
    let res = await logoutCall();
    if (res.success) {
      history.push("/login");
    } else {
      // console.log(res);
    }
  };
  const editProfileHandler = () => {
    history.push("/profile/edit");
  };
  return (
    <div className="Utility">
      <div className="utility__container">
        <span className="utilityIcon__container" onClick={messageHandler}>
          <FontAwesomeIcon icon={MessageIcon} className="utility__icon" />
        </span>
        <span className="utilityIcon__container" onClick={notificationHandler}>
          <FontAwesomeIcon icon={NotificationIcon} className="utility__icon" />
        </span>
        <span className="utilityIcon__container" onClick={settingHandler}>
          <FontAwesomeIcon icon={OthersIcon} className="utility__icon" />
        </span>
      </div>
      <div
        className={`settingDropdown__container ${
          toggleDropdown
            ? "settingDropdown__container--enabled"
            : "settingDropdown__container--disabled"
        }`}
      >
        <div
          className="logout__container"
          onClick={() => {
            logoutHandler();
          }}
        >
          <span className="logout__button">
            <FontAwesomeIcon icon={LogoutIcon}></FontAwesomeIcon>
          </span>
          <span className="logout__description"> Logout</span>
        </div>
        <div
          className="userEdit__container"
          onClick={() => {
            editProfileHandler();
          }}
        >
          <span className="userEdit__button">
            <FontAwesomeIcon icon={UserEditIcon}></FontAwesomeIcon>
          </span>
          <span className="userEdit__description"> Edit profile</span>
        </div>
      </div>
    </div>
  );
};
