import React from "react";

interface friendData {
  friendName: string;
  friendId: string;
  friendAvatar: string;
}
interface onClickFunction {
  (data: friendData): void;
}
interface FriendInformationProps {
  friendId: string;
  friendAvatar: string;
  friendName: string;
  onClickHandler?: any;
  customClass?: string;
}

export const FriendInformation: React.FC<FriendInformationProps> = ({
  friendId,
  friendAvatar,
  friendName,
  onClickHandler,
  customClass,
}) => {
  return (
    <div
      className={`FriendInformation ${friendId} ${customClass}`}
      onClick={() => {
        onClickHandler({ friendId, friendName, friendAvatar });
      }}
    >
      <div className="FriendInformation__avatarContainer">
        <img
          src={friendAvatar}
          alt="avatar"
          className="FriendInformation__avatar"
        />
      </div>
      <div className="FriendInformation__descriptionContainer">
        <span className="FriendInformation__name">{friendName}</span>
        {/* TODO: show latest message between user n this friend */}
        <span className="FriendInformation__description"></span>
      </div>
    </div>
  );
};
