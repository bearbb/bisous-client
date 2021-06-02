import React from "react";

interface ChatProps {
  message: string;
  //   sender: string;
  //   receiver: string;
  //   createdAt: string;
  isIncoming: boolean;
}

export const Chat: React.FC<ChatProps> = ({
  message,
  //   sender,
  //   receiver,
  isIncoming,
}) => {
  return (
    <div
      className={`chat__container ${
        isIncoming ? "incomingChat__container" : "outcomingChat__container"
      }`}
    >
      <span className="chat__message">{message}</span>
    </div>
  );
};
