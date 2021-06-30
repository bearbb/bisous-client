import React, { useState, useEffect, useContext } from "react";
import { Logo } from "pages/Header/Logo";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import { LoadingScreen } from "pages/LoadingScreen/LoadingScreen";
import avatar from "styles/images/avatar.webp";
import "pages/UserDetail/UserDetail.css";
import axiosInstance from "Utility/axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";
import sleep from "Utility/sleep";
import { useUserContext } from "Contexts/UserContext";
import { useFollowContext } from "Contexts/FollowContext";
import { faUserCheck } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { followUser, unFollowUser } from "Utility/follow";
import { LoadingCube } from "pages/LoadingScreen/LoadingCube";
const FollowedIcon = faUserCheck as IconProp;
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
export interface GetPostListData {
  posts: string[];
  postCount: number;
}
interface GetFollowData {
  follower: string[];
  followerCount: number;
  followingCount: number;
  following: string[];
}
interface GetUserData {
  username: string;
  userId: string;
  userAvatar: string;
  bio: string;
}
const getUserData = async (userId: string): Promise<GetUserData> => {
  let res = await axiosInstance.get(`/users/${userId}`);
  return {
    username: res.data.userDoc.username,
    userId: userId,
    userAvatar: res.data.userDoc.avatar,
    bio: res.data.userDoc.bio,
  };
};
const getUserPostList = async (userId: string): Promise<GetPostListData> => {
  let postListData: GetPostListData = {
    postCount: 0,
    posts: [],
  };
  let res = await axiosInstance.get(`/users/${userId}/posts`);
  postListData.postCount = res.data.postCount;
  postListData.posts = res.data.posts;
  // console.log(postListData);
  return postListData;
};
interface FollowData {
  _id: string;
  username: string;
}
const getFollowData = async (userId: string): Promise<GetFollowData> => {
  let res = await axiosInstance.get(`/follows/${userId}`);
  let followerList = res.data.followDoc.follower.map(
    (obj: FollowData) => obj._id
  );
  let followingList = res.data.followDoc.following.map(
    (obj: FollowData) => obj._id
  );
  let followData: GetFollowData = {
    follower: followerList,
    followerCount: res.data.followDoc.followerCount,
    following: followingList,
    followingCount: res.data.followDoc.followingCount,
  };
  return followData;
};
interface GetPostData {
  image: string;
  postId: string;
}
const getPostData = async (postId: string): Promise<GetPostData> => {
  let res = await axiosInstance.get(`/posts/${postId}`);
  let post = res.data.post;
  let postData = {
    image: post.pictures[0],
    postId: post._id,
  };
  return postData;
};
const getPostsFromPostList = async (
  postList: string[]
): Promise<GetPostData[]> => {
  let data = await Promise.all(
    postList.map(async (postId) => {
      let temp = await getPostData(postId);
      return temp;
    })
  );
  return data;
};
interface Params {
  userId: string;
}
//TODO: No need to call follows and users api any more =)) remember to remove it
const getAllData = async (userId: string) => {
  let [data0, data1, data3] = await Promise.all([
    getUserPostList(userId),
    getFollowData(userId),
    getUserData(userId),
  ]);
  let data2 = await getPostsFromPostList(data0.posts);
  console.log(data3);
  return { data0, data1, data2, data3 };
};
const isOwnPage = (ownId: string, paramsUserId: string) => {
  // console.log("ownId: ", ownId);
  // console.log("paramsID: ", paramsUserId);
  return ownId === paramsUserId;
};
export const UserDetail: React.FC<UserDetailProps> = ({}) => {
  const history = useHistory();
  const params: Params = useParams();
  const [postId, setPostId] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [postListData, setPostListData] = useState<GetPostListData>({
    postCount: 0,
    posts: [],
  });
  const [followData, setFollowData] = useState<GetFollowData>({
    follower: [""],
    followerCount: 0,
    following: [""],
    followingCount: 0,
  });
  const { followData: userFollowData, setFollowData: setUserFollowData } =
    useFollowContext();
  const { userData, setUserData } = useUserContext();
  const [userData1, setUserData1] = useState<GetUserData>({
    userId: "",
    username: "",
    userAvatar: "",
    bio: "",
  });
  const [postsData, setPostsData] = useState<GetPostData[] | null>(null);
  const isOwner = isOwnPage(userData.userId, params.userId);
  console.log(isOwner);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const followHandler = async (isFollowed: boolean, userId: string) => {
    let res;
    if (isFollowed) {
      res = await unFollowUser(userId);
      if (res) {
        setIsFollowed(false);
      }
    } else {
      res = await followUser(userId);
      if (res) {
        setIsFollowed(true);
      }
    }
    console.log(res);
  };
  useEffect(() => {
    (async () => {
      setIsFetching(true);
      let { data0, data1, data2, data3 } = await getAllData(params.userId);
      setPostsData(data2);
      setPostListData(data0);
      setFollowData(data1);
      setUserData1(data3);
      sleep(1);
      setIsFetching(false);
    })();
    console.log("follow data:", followData);
    let followIndex = userFollowData.following.indexOf(params.userId);
    if (followIndex !== -1) {
      setIsFollowed(true);
    }
  }, []);
  useEffect(() => {
    console.log(isFollowed);
    return () => {};
  }, [isFollowed]);
  const renderPostPreview = (data: GetPostData[]): React.ReactElement => {
    let ren = data.map((post) => {
      if (post.image !== "" && post.postId !== "")
        return (
          <a
            key={post.postId}
            className="PP__hoverContainer"
            onClick={() => {
              history.push(`/p/${post.postId}`);
            }}
          >
            <div className="PostPreview__container">
              <div className="ppImg__container">
                <LazyLoad>
                  <img
                    src={`https://application.swanoogie.me/api/images/${post.image}`}
                    alt=""
                    className="pp__img"
                  />
                </LazyLoad>
              </div>
            </div>
          </a>
        );
    });
    return <div className="PostPreview">{ren}</div>;
  };
  if (isFetching) {
    return <LoadingCube></LoadingCube>;
  }
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
            <img
              src={`https://application.swanoogie.me/api/images/${userData1.userAvatar}`}
              alt=""
              className="userIn4__avatar"
            />
          </div>
          <div className="userIn4Detail__container">
            <div className="userIn4Username__container">
              <span className="userIn4__username">{userData1.username}</span>
              <div
                onClick={() => {
                  followHandler(isFollowed, params.userId);
                }}
                className={`userIn4__followContainer ${
                  isOwner ? "userIn4__followContainer--ownerPage" : ""
                } ${
                  isFollowed
                    ? "userIn4__followContainer--followed"
                    : "userIn4__followContainer--notFollowed"
                }`}
              >
                <span className="follow__button">
                  {isFollowed ? (
                    <FontAwesomeIcon
                      icon={FollowedIcon}
                      size="1x"
                      color="#262626"
                    ></FontAwesomeIcon>
                  ) : (
                    "Follow"
                  )}
                </span>
              </div>
            </div>
            <div className="userIn4Count__container">
              <div className="postCount__container ">
                <span className="postCount__span userIn4Count__span--bold">
                  {postListData.postCount}
                </span>
                {postListData.postCount >= 2 ? (
                  <span className="in4Count__description"> posts</span>
                ) : (
                  <span className="in4Count__description"> post</span>
                )}
              </div>
              <div className="followerCount__container">
                <span className="followerCount__span userIn4Count__span--bold">
                  {followData.followerCount}
                </span>
                {followData.followerCount >= 2 ? (
                  <span className="in4Count__description"> followers</span>
                ) : (
                  <span className="in4Count__description"> follower</span>
                )}
              </div>
              <div className="followingCount__container">
                <span className="followingCount__span userIn4Count__span--bold">
                  {followData.followingCount}
                </span>
                <span className="in4Count__description"> following</span>
              </div>
            </div>
            <div className="userIn4Description__container">
              <span className="userIn4__description">{userData1.bio}</span>
            </div>
          </div>
        </div>
        <div className="userPost__container">
          <div className="up__suContainer">
            <div className="userPost__descriptionContainer">
              <span className="userPost__descriptionHeader">POSTS</span>
            </div>
          </div>
          <div className="PostPreview__suContainer">
            {postsData === null ? (
              <span>Loading</span>
            ) : (
              renderPostPreview(postsData)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
