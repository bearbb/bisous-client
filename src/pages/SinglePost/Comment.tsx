import React from "react";

interface CommentProps {
  content: string;
  avatar: string;
  username: string;
}

export const Comment: React.FC<CommentProps> = ({
  content,
  avatar,
  username,
}) => {
  return (
    <div className="Comment">
      <div className="commentAvatar__container">
        <img src={avatar} alt="" className="comment__avatar" />
      </div>
      <div className="commentContent__container">
        <span className="comment__author">{username}</span>
        <span className="comment__extraSpace"> </span>
        <span className="comment__content">{content}</span>
      </div>
    </div>
  );
};
