import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const NewChatIcon = faInbox as IconProp;

interface EmptyChatBoxProps {}

export const EmptyChatBox: React.FC<EmptyChatBoxProps> = ({}) => {
  return (
    <div className="emptyChatBox__container">
      <div className="newChatIcon__container">
        <span className="newChatIcon__span">
          <FontAwesomeIcon
            className="newChatIcon"
            icon={NewChatIcon}
          ></FontAwesomeIcon>
        </span>
      </div>
      <div className="newChatDescription__container">
        <span className="newChatDescription">
          select one of your friends to start the chat
        </span>
      </div>
    </div>
  );
};
