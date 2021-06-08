import React from "react";

import { friendData } from "pages/Message/Message";
import "pages/SinglePost/Share.css";

interface ShareProps {
  friendList: friendData[];
  postId: string;
}

export const Share: React.FC<ShareProps> = ({ friendList, postId }) => {
  const renderFriendList = (data: friendData[]): React.ReactElement => {
    let render = data.map((fData: friendData) => {
      return (
        <li id={fData.friendId} className="friend__container">
          <div className="friendAvatar__container">
            <img className="friend__avatar" src={fData.friendAvatar} />
          </div>
          <div className="friendDetail__container">
            <span className="friend__name">{fData.friendName}</span>
          </div>
        </li>
      );
    });
    // console.log(render);
    return <ul className="FriendList__container">{render}</ul>;
  };
  return (
    <div className="Share">
      <div className="share__container">
        <div className="shareHeader__container">
          <h2 className="share__header">Share</h2>
        </div>
        <div className="shareFriendList__container">
          <div className="shareFriendList__description">
            <span>Friends</span>
          </div>
          {renderFriendList(friendList)}
        </div>
        <div className="shareSubmit__container">
          <div className="share__submit">
            <span className="shareSubmit__span">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
};
