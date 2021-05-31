import React, { useState, useEffect } from "react";
import "../../styles/Feed__post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShareSquare,
  faBookmark,
} from "@fortawesome/fontawesome-free-regular";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const HeartIcon = faHeart as IconProp;
const CommentIcon = faComment as IconProp;
const ShareIcon = faShareSquare as IconProp;
const FavoriteIcon = faBookmark as IconProp;
interface PostProps {
  postId: string;
  authorAvatar: string;
  authorName: string;
  postImg: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  saveCount: number;
  caption: string;
  userAvatar: string;
  isLiked: boolean;
  isShared: boolean;
  isSaved: boolean;
}

export const Post: React.FC<PostProps> = ({
  postId,
  authorAvatar,
  authorName,
  postImg,
  likeCount,
  shareCount,
  commentCount,
  saveCount,
  caption,
  userAvatar,
  isLiked,
  isShared,
  isSaved,
}) => {
  const [comment, setComment] = useState<string>("");
  const [commentIsEmpty, setCommentIsEmpty] = useState<boolean>(true);
  const [postIsLiked, setPostIsLiked] = useState<boolean>(isLiked);
  const [postIsShared, setPostIsShared] = useState<boolean>(isShared);
  const [postIsSaved, setPostIsSaved] = useState<boolean>(isSaved);
  const commentHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value.toString());
  };
  const commentSubmit = () => {
    //check empty
    if (commentIsEmpty) {
      //DO nothing
    } else {
      //TODO: send a post to api
    }
    console.log(
      `%cClicked`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
  };
  //if already liked or shared or saved then on click => unlike,...
  const likeHandler = () => {};
  const shareHandler = () => {};
  const saveHandler = () => {};
  useEffect(() => {
    //check if comment is empty
    if (comment == "") {
      setCommentIsEmpty(true);
    } else {
      setCommentIsEmpty(false);
    }
    console.log(commentIsEmpty);
  }, [comment]);
  return (
    <div className="Post">
      <div className="post__user">
        <img src={authorAvatar} alt="" className="postUser__avatar" />
        <span className="postUser__userName">{authorName}</span>
      </div>
      <div className="postImage__container">
        <img className="post__image" src={postImg} alt="" />
      </div>
      <div className="post__information">
        <div className="postIn4">
          <span
            className={`postIn4__icon ${
              isLiked
                ? "postIn4__likeIcon--liked postIn4__icon--active"
                : "postIn4__likeIcon--notLiked"
            }`}
          >
            <FontAwesomeIcon icon={HeartIcon} size="lg" />
          </span>
          <span className="postIn4__like">{likeCount} likes</span>
        </div>
        <div className="postIn4">
          <span className={`postIn4__icon`}>
            <FontAwesomeIcon icon={CommentIcon} size="lg" />
          </span>
          <span className="postIn4__comment">{commentCount} comments</span>
        </div>
        <div className="postIn4">
          <span
            className={`postIn4__icon ${
              isShared
                ? "postIn4__shareIcon--shared postIn4__icon--active"
                : "postIn4__shareIcon--notShared"
            }`}
          >
            <FontAwesomeIcon icon={ShareIcon} size="lg" />
          </span>
          <span className="postIn4__share">{shareCount} shares</span>
        </div>
        <div className="postIn4">
          <span
            className={`postIn4__icon ${
              isSaved
                ? "postIn4__saveIcon--saved postIn4__icon--active"
                : "postIn4__saveIcon--notSaved"
            }`}
          >
            <FontAwesomeIcon icon={FavoriteIcon} size="lg" />
          </span>
          <span className="postIn4__save">{saveCount} save</span>
        </div>
      </div>
      <div className="post__caption">
        <span className="postCaption__content">{caption}</span>
      </div>
      <div className="post__comment">
        <img src={userAvatar} alt="" className="postComment__avatar" />
        <textarea
          className="postComment__input"
          placeholder="Add a comment..."
          autoComplete="off"
          autoCorrect="off"
          onChange={(e) => {
            commentHandler(e);
          }}
        />
        <span
          className={`postComment__submit ${
            commentIsEmpty
              ? "postComment__submit--disabled"
              : "postComment__submit--enabled"
          }`}
          onClick={commentSubmit}
        >
          Post
        </span>
      </div>
    </div>
  );
};
