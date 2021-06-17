import React, { useState, useEffect, useRef } from "react";
import { GetPostData, CommentData } from "pages/SinglePost/SinglePostPage";
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
import { likePost, unlikePost } from "Utility/like";
import { commentPost } from "Utility/comment";
import avatar from "styles/images/avatar.webp";
const HeartIcon = faHeart as IconProp;
const HeartSolidIcon = faHeartSolid as IconProp;
const CommentIcon = faComment as IconProp;
const ShareIcon = faShareSquare as IconProp;
const FavoriteIcon = faBookmark as IconProp;
const FavoriteSolidIcon = faBookmarkSolid as IconProp;

function timeSince(date: string) {
  let d = new Date(date).getTime();
  let currentTime = new Date().getTime();
  let diffTime = currentTime - d;
  let seconds = diffTime / 1000;

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export const SinglePost: React.FC<GetPostData> = ({
  pictures,
  likeCount,
  comments,
  caption,
  author,
  createdAt,
  isLiked,
  _id,
  shareOnClickHandler,
}) => {
  const [timeSinceCreated, setTimeSinceCreated] = useState<string>("");
  const [postLikeCount, setPostLikeCount] = useState<number>(likeCount);
  const [postIsLiked, setPostIsLiked] = useState<boolean>(isLiked);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<CommentData[]>(comments);
  const [newComment, setNewComment] = useState<string>("");
  const [newCommentIsEmpty, setNewCommentIsEmpty] = useState<boolean>(true);
  const newCommentHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value.toString());
  };
  useEffect(() => {
    let temp = timeSince(createdAt);
    setTimeSinceCreated(temp);
    return () => {};
  }, []);
  //check if comment is empty
  useEffect(() => {
    if (newComment == "") {
      setNewCommentIsEmpty(true);
    } else {
      setNewCommentIsEmpty(false);
    }
    return () => {};
  }, [newComment]);
  const newCommentSubmitHandler = async () => {
    try {
      if (!newCommentIsEmpty) {
        let res = await commentPost(_id, newComment);
        setCommentsList(res.post.comments);
        setNewComment("");
        newCommentInputRef.current!.value = "";
        // console.log(res);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  //Interaction handler(like,...)
  const likeHandler = async () => {
    try {
      let likeRes;
      if (postIsLiked) {
        likeRes = await unlikePost(_id);
      } else {
        likeRes = await likePost(_id);
      }
      setPostIsLiked(!postIsLiked);
      setPostLikeCount(likeRes.post.likeCount);
    } catch (error) {
      // console.error(error);
    }
  };
  const doubleClickLikeHandler = async () => {
    await likeHandler();
  };
  const newCommentInputRef = useRef<HTMLTextAreaElement>(null);
  const commentHandler = () => {
    if (newCommentInputRef.current !== null) {
      newCommentInputRef.current!.focus();
    }
  };
  // const shareHandler = () => {};
  const saveHandler = () => {
    setIsSaved(!isSaved);
  };
  const renderCommentList = (
    commentData: CommentData[]
  ): React.ReactElement => {
    //loop through all comments
    let render = commentData
      .slice(0)
      .reverse()
      .map((comment) => {
        return (
          <Comment
            avatar={avatar}
            content={comment.comment}
            username={comment.author.username}
          ></Comment>
        );
      });
    return <ul>{render}</ul>;
  };
  return (
    <div className="SinglePost__container">
      <div className="SinglePost">
        <div className="sp__container">
          <div
            className="spImage__container"
            onDoubleClick={doubleClickLikeHandler}
          >
            <img src={pictures[0]} alt="" className="sp__img" />
          </div>
          <div className="spDescription__container">
            <div className="spDescription__1th">
              <div className="spAuthor__container">
                <div className="spAvatar__container">
                  <img src={avatar} alt="" className="sp__avatar" />
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
                      avatar={avatar}
                      username={author.username}
                      content={caption}
                    />
                  </div>
                  {/*Function to render all comment out */}
                  {renderCommentList(commentsList)}
                </div>
              </div>
            </div>
            <div className="spDescription__2nd">
              <div className="spInteraction__container">
                <div className="spInteraction__container--left">
                  <span className="spInteraction__icon" onClick={likeHandler}>
                    {postIsLiked ? (
                      <FontAwesomeIcon
                        icon={HeartSolidIcon}
                        size="lg"
                        color="#ff6347"
                      />
                    ) : (
                      <FontAwesomeIcon icon={HeartIcon} size="lg" />
                    )}
                  </span>
                  <span
                    className="spInteraction__icon"
                    onClick={commentHandler}
                  >
                    <FontAwesomeIcon icon={CommentIcon} size="lg" />
                  </span>
                  <span
                    className="spInteraction__icon"
                    onClick={() => {
                      shareOnClickHandler();
                    }}
                  >
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
                <div className="spLikeCount__container">
                  {/* show like count */}
                  <span className="spDetail__likeCount">{postLikeCount}</span>
                  <span className="spDetail__extraSpace"> </span>
                  <span className="spDetail__descriptions">
                    {postLikeCount >= 2 ? "likes" : "like"}
                  </span>
                </div>
                <div className="spTimeSince__container">
                  <span className="spDetail__timeSince">
                    {timeSinceCreated}
                  </span>
                </div>
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
    </div>
  );
};
