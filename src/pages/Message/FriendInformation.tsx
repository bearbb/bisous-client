import React from "react";

interface FriendInformationProps {
  friendId: string;
  friendAvatar: string;
  friendName: string;
}

export const FriendInformation: React.FC<FriendInformationProps> = ({
  friendId,
  friendAvatar,
  friendName,
}) => {
  return (
    <div className="FriendInformation">
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
