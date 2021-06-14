import React, { useState, useEffect } from "react";
import "styles/Feed__post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBookmark,
} from "@fortawesome/fontawesome-free-regular";
import { faHeart as HeartSolid } from "@fortawesome/fontawesome-free-solid";
import { faEllipsisH } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LazyLoad from "react-lazyload";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});

const HeartIcon = faHeart as IconProp;
const HeartSolidIcon = HeartSolid as IconProp;
const CommentIcon = faComment as IconProp;
const FavoriteIcon = faBookmark as IconProp;
const MoreIcon = faEllipsisH as IconProp;
export interface PostProps {
  postId: string;
  authorAvatar: string;
  authorName: string;
  postImg: string;
  likeCount: number;
  commentCount: number;
  saveCount: number;
  caption: string;
  userAvatar: string;
  isLiked: boolean;
  isSaved: boolean;
}

const likePost = async (postId: string) => {
  try {
    let res = await axiosInstance.post(`/posts/${postId}/likes`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return { error: err.response };
  }
};
const unlikePost = async (postId: string) => {
  try {
    let res = await axiosInstance.delete(`/posts/${postId}/likes`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return { error: err.response };
  }
};
export const Post: React.FC<PostProps> = ({
  postId,
  authorAvatar,
  authorName,
  postImg,
  likeCount,
  commentCount,
  saveCount,
  caption,
  userAvatar,
  isLiked,
  isSaved,
}) => {
  const history = useHistory();
  const [comment, setComment] = useState<string>("");
  const [commentIsEmpty, setCommentIsEmpty] = useState<boolean>(true);
  const [postIsLiked, setPostIsLiked] = useState<boolean>(isLiked);
  const [postLikeCount, setPostLikeCount] = useState<number>(likeCount);
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
  const likeHandler = async () => {
    let res;
    if (postIsLiked) {
      res = await unlikePost(postId);
    } else {
      res = await likePost(postId);
    }
    if (res && !res.error) {
      setPostIsLiked(!postIsLiked);
      setPostLikeCount(res.post.likeCount);
    }
  };
  const saveHandler = () => {};
  const moreHandler = () => {
    //pass in post id and navigate to that post
    history.push("/p");
  };
  useEffect(() => {
    //check if comment is empty
    if (comment == "") {
      setCommentIsEmpty(true);
    } else {
      setCommentIsEmpty(false);
    }
  }, [comment]);
  return (
    <div className="Post">
      <div className="post__header">
        <div className="post__user">
          <LazyLoad>
            <img src={authorAvatar} alt="" className="postUser__avatar" />
          </LazyLoad>
          <span className="postUser__userName">{authorName}</span>
        </div>
        <div className="postMore__container">
          <span className="post__more" onClick={moreHandler}>
            <FontAwesomeIcon icon={MoreIcon} size="lg" />
          </span>
        </div>
      </div>
      <div className="postImage__container">
        <LazyLoad>
          <img className="post__image" src={postImg} alt="" />
        </LazyLoad>
      </div>
      <div className="post__information">
        <div className="postIn4">
          <span
            onClick={likeHandler}
            className={`postIn4__icon ${
              postIsLiked
                ? "postIn4__likeIcon--liked postIn4__icon--active"
                : "postIn4__likeIcon--notLiked"
            }`}
          >
            {postIsLiked ? (
              <FontAwesomeIcon icon={HeartSolidIcon} size="lg" />
            ) : (
              <FontAwesomeIcon icon={HeartIcon} size="lg" />
            )}
          </span>
          <span className="postIn4__like">{postLikeCount} likes</span>
        </div>
        <div className="postIn4">
          <span className={`postIn4__icon`}>
            <FontAwesomeIcon icon={CommentIcon} size="lg" />
          </span>
          <span className="postIn4__comment">{commentCount} comments</span>
        </div>
        {/* <div className="postIn4">
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
        </div> */}
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
        <LazyLoad>
          <img src={userAvatar} alt="" className="postComment__avatar" />
        </LazyLoad>
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
