import React, { useState, useEffect, useRef } from "react";
import { PostData, comment } from "pages/SinglePost/SinglePostPage";
import "pages/SinglePost/SinglePost.css";
import { Comment } from "pages/SinglePost/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShareSquare,
  faBookmark,
} from "@fortawesome/fontawesome-free-regular";
import {
  faHeart as faHeartSolid,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
const HeartIcon = faHeart as IconProp;
const HeartSolidIcon = faHeartSolid as IconProp;
const CommentIcon = faComment as IconProp;
const ShareIcon = faShareSquare as IconProp;
const FavoriteIcon = faBookmark as IconProp;
const FavoriteSolidIcon = faBookmarkSolid as IconProp;

export const SinglePost: React.FC<PostData> = ({
  pictures,
  likeCount,
  comments,
  caption,
  author,
  createdAt,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [newCommentIsEmpty, setNewCommentIsEmpty] = useState<boolean>(true);
  const newCommentHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value.toString());
  };
  //check if comment is empty
  useEffect(() => {
    if (newComment == "") {
      setNewCommentIsEmpty(true);
    } else {
      setNewCommentIsEmpty(false);
    }
    return () => {};
  }, [newComment]);
  const newCommentSubmitHandler = () => {
    console.log(
      `%cPost clicked`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
  };

  //Interaction handler(like,...)
  const likeHandler = () => {
    setIsLiked(!isLiked);
  };
  const doubleClickLikeHandler = () => {
    setIsLiked(true);
  };
  const newCommentInputRef = useRef<HTMLTextAreaElement>(null);
  const commentHandler = () => {
    if (newCommentInputRef.current !== null) {
      newCommentInputRef.current!.focus();
    }
  };
  const shareHandler = () => {};
  const saveHandler = () => {
    setIsSaved(!isSaved);
  };
  const renderCommentList = (commentData: comment[]): React.ReactElement => {
    //loop through all comments
    let render = commentData.map((comment) => {
      return (
        <Comment
          avatar={comment.author.avatar}
          content={comment.comment}
          username={author.username}
        ></Comment>
      );
    });
    return <ul>{render}</ul>;
  };
  return (
    <div className="SinglePost">
      <div className="sp__container">
        <div
          className="spImage__container"
          onDoubleClick={doubleClickLikeHandler}
        >
          <img src={pictures} alt="" className="sp__img" />
        </div>
        <div className="spDescription__container">
          <div className="spDescription__1th">
            <div className="spAuthor__container">
              <div className="spAvatar__container">
                <img src={author.avatar} alt="" className="sp__avatar" />
              </div>
              <div className="spUsername__container">
                <span className="sp__username">{author.username}</span>
              </div>
            </div>
            <div className="spComment__container">
              <div className="spCommentList__container">
                {/* Render out caption as a comment element */}
                <div className="spCaption__container">
                  <Comment
                    avatar={author.avatar}
                    username={author.username}
                    content={caption}
                  />
                </div>
                {/*Function to render all comment out */}
                {renderCommentList(comments)}
              </div>
            </div>
          </div>
          <div className="spDescription__2nd">
            <div className="spInteraction__container">
              <div className="spInteraction__container--left">
                <span className="spInteraction__icon" onClick={likeHandler}>
                  {isLiked ? (
                    <FontAwesomeIcon
                      icon={HeartSolidIcon}
                      size="lg"
                      color="#ff6347"
                    />
                  ) : (
                    <FontAwesomeIcon icon={HeartIcon} size="lg" />
                  )}
                </span>
                <span className="spInteraction__icon" onClick={commentHandler}>
                  <FontAwesomeIcon icon={CommentIcon} size="lg" />
                </span>
                <span className="spInteraction__icon" onClick={shareHandler}>
                  <FontAwesomeIcon icon={ShareIcon} size="lg" />
                </span>
              </div>
              <div className="spInteraction__container--right">
                <span className="spInteraction__icon" onClick={saveHandler}>
                  {isSaved ? (
                    <FontAwesomeIcon
                      icon={FavoriteSolidIcon}
                      size="lg"
                      color="#ff6347"
                    />
                  ) : (
                    <FontAwesomeIcon icon={FavoriteIcon} size="lg" />
                  )}
                </span>
              </div>
            </div>
            <div className="spDetail__container">
              {/* show like count */}
              <span className="spDetail__likeCount">{likeCount}</span>
              <span className="spDetail__extraSpace"> </span>
              <span className="spDetail__descriptions">
                {likeCount >= 2 ? "likes" : "like"}
              </span>
            </div>
            <div className="spNewComment__container">
              <div className="spNewComment__inputContainer">
                <textarea
                  ref={newCommentInputRef}
                  placeholder="Add a comment..."
                  className="spNewComment__textarea"
                  onChange={(e) => {
                    newCommentHandler(e);
                  }}
                ></textarea>
                <span
                  onClick={newCommentSubmitHandler}
                  className={`spNewComment__submit ${
                    newCommentIsEmpty
                      ? "spNewComment__submit--disabled"
                      : "spNewComment__submit--enabled"
                  }`}
                >
                  Post
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
