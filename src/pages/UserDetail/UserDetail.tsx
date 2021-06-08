import React, { useState, useEffect } from "react";
import { Logo } from "pages/Header/Logo";
// import { Nav } from "pages/Header/Nav";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import avatar from "styles/images/avatar.webp";
import postImg from "styles/images/wallpaper.jpg";
import yuna from "styles/images/yuna.jpg";
import yuna2 from "styles/images/yuna2.jpg";
import "pages/UserDetail/UserDetail.css";
interface UserDetailProps {}

interface UserInformationData {
  username: string;
  postCount: number;
  followingCount: number;
  followerCount: number;
  description: string;
  avatar: string;
}
let userIn4: UserInformationData = {
  username: "BearBB",
  postCount: 69,
  followerCount: 69,
  followingCount: 69,
  description: "Just an asshole trying to finish his job",
  avatar: avatar,
};
interface PostData {
  picture: string;
  likeCount: number;
  commentCount: number;
  postId: string;
}
let postsData: PostData[] = [
  {
    picture: yuna2,
    likeCount: 6,
    commentCount: 9,
    postId: "p1",
  },
  {
    picture: postImg,
    likeCount: 6,
    commentCount: 9,
    postId: "p3",
  },
  {
    picture: yuna,
    likeCount: 2,
    commentCount: 3,
    postId: "p2",
  },
  {
    picture: yuna2,
    likeCount: 6,
    commentCount: 9,
    postId: "p1",
  },
  {
    picture: postImg,
    likeCount: 6,
    commentCount: 9,
    postId: "p1",
  },
  {
    picture: yuna,
    likeCount: 2,
    commentCount: 3,
    postId: "p1",
  },
];
export const UserDetail: React.FC<UserDetailProps> = ({}) => {
  const [postId, setPostId] = useState<string>("");
  useEffect(() => {
    console.log(
      `%cPost id is: ${postId}`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    return () => {};
  }, [postId]);
  const renderPostPreview = (data: PostData[]): React.ReactElement => {
    let render = [];
    //only render out 3 img per
    for (let i = 0; i < 3; i++) {
      render.push(
        <a
          className="PP__hoverContainer"
          onClick={() => {
            setPostId(data[i].postId);
          }}
        >
          <div className="PostPreview__container">
            <div className="ppImg__container">
              <img src={data[i].picture} alt="" className="pp__img" />
            </div>
          </div>
        </a>
      );
    }
    return <div className="PostPreview">{render}</div>;
  };
  return (
    <div className="UserDetail">
      <div className="feedsHeader__container">
        <div className="headerFlex__container">
          <Logo></Logo>
          <SearchNNewPost></SearchNNewPost>
          <Utility></Utility>
        </div>
      </div>
      <div className="user__container">
        <div className="userDetailInformation__container">
          <div className="userIn4Avatar__container">
            <img src={userIn4.avatar} alt="" className="userIn4__avatar" />
          </div>
          <div className="userIn4Detail__container">
            <div className="userIn4Username__container">
              <h2 className="userIn4__username">{userIn4.username}</h2>
            </div>
            <div className="userIn4Count__container">
              <div className="postCount__container ">
                <span className="postCount__span userIn4Count__span--bold">
                  {userIn4.postCount}
                </span>
                {userIn4.postCount >= 2 ? (
                  <span className="in4Count__description"> posts</span>
                ) : (
                  <span className="in4Count__description"> post</span>
                )}
              </div>
              <div className="followerCount__container">
                <span className="followerCount__span userIn4Count__span--bold">
                  {userIn4.followerCount}
                </span>
                {userIn4.followerCount >= 2 ? (
                  <span className="in4Count__description"> followers</span>
                ) : (
                  <span className="in4Count__description"> follower</span>
                )}
              </div>
              <div className="followingCount__container">
                <span className="followingCount__span userIn4Count__span--bold">
                  {userIn4.followingCount}
                </span>
                <span className="in4Count__description"> following</span>
              </div>
            </div>
            <div className="userIn4Description__container">
              <span className="userIn4__description">
                {userIn4.description}
              </span>
            </div>
          </div>
        </div>
        <div className="userPost__container">
          <h2 className="userPost__descriptionHeader">POSTS</h2>
          <div className="PostPreview__suContainer">
            {renderPostPreview(postsData)}
            {renderPostPreview(postsData)}
            {renderPostPreview(postsData)}
            {renderPostPreview(postsData)}
          </div>
        </div>
      </div>
    </div>
  );
};
