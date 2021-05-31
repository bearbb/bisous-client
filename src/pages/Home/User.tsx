import React from "react";
import "../../styles/Feed__user.css";
import avatar from "../../styles/images/avatar.webp";

interface UserProps {}

export const User: React.FC<UserProps> = ({}) => {
  return (
    <div className="User">
      <div className="userInformation__container">
        <div className="userInformation__avatar">
          <img src={avatar} alt="" className="avatar" />
        </div>
        <div className="userInformation__description">
          <span className="userInformation__userName">Bear BB</span>
          <span className="userInformation__name">Hieu Nguyen</span>
        </div>
      </div>
      <div className="userInformationCount__container">
        <div className="userInformationCount__posts">
          <span className="userInformationCount__count">10</span>
          <span className="userInformationCount__description">posts</span>
        </div>
        <div className="userInformationCount__followers">
          <span className="userInformationCount__count">200</span>
          <span className="userInformationCount__description">follower</span>
        </div>
        <div className="userInformationCount__following">
          <span className="userInformationCount__count">200</span>
          <span className="userInformationCount__description">following</span>
        </div>
      </div>
    </div>
  );
};
