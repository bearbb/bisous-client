import React from "react";

interface CommentProps {
  content: string;
  avatar: string;
  username: string;
  authorId: string;
  navFunc: (userId: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  content,
  avatar,
  username,
  authorId,
  navFunc,
}) => {
  return (
    <div className="Comment">
      <div
        className="commentAvatar__container"
        onClick={() => {
          navFunc(authorId);
        }}
      >
        <img src={avatar} alt="" className="comment__avatar" />
      </div>
      <div className="commentContent__container">
        <span
          className="comment__author"
          onClick={() => {
            navFunc(authorId);
          }}
        >
          {username}
        </span>
        <span className="comment__extraSpace"> </span>
        <span className="comment__content">{content}</span>
      </div>
    </div>
  );
};
