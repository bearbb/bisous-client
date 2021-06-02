import React from "react";
import "../../styles/Feed__user.css";
import avatar from "../../styles/images/avatar.webp";

interface UserProps {
  userAvatar: string;
  userName: string;
  name: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export const User: React.FC<UserProps> = ({
  userAvatar,
  userName,
  name,
  postCount,
  followerCount,
  followingCount,
}) => {
  const userNameHandler = () => {};
  return (
    <div className="User">
      <div className="userInformation__container">
        <div className="userInformation__avatarContainer">
          <img src={avatar} alt="" className="userInformation__avatar" />
        </div>
        <div className="userInformation__description">
          <span className="userInformation__userName" onClick={userNameHandler}>
            {userName}
          </span>
          <span className="userInformation__name">{name}</span>
        </div>
      </div>
      <div className="userInformationCount__container">
        <div className="userInformationCount__posts">
          <span className="userInformationCount__count">{postCount}</span>
          <span className="userInformationCount__description">posts</span>
        </div>
        <div className="userInformationCount__followers">
          <span className="userInformationCount__count">{followerCount}</span>
          <span className="userInformationCount__description">follower</span>
        </div>
        <div className="userInformationCount__following">
          <span className="userInformationCount__count">{followingCount}</span>
          <span className="userInformationCount__description">following</span>
        </div>
      </div>
    </div>
  );
};
