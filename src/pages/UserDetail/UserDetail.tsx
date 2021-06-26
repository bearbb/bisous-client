import React, { useState, useEffect } from "react";
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
}
const getUserData = async (userId: string): Promise<GetUserData> => {
  let res = await axiosInstance.get(`/users/${userId}`);
  return { username: res.data.userDoc.username };
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
const getFollowData = async (): Promise<GetFollowData> => {
  let res = await axiosInstance.get(`/follows`);
  let followData: GetFollowData = {
    follower: res.data.followDoc.follower,
    followerCount: res.data.followDoc.followerCount,
    following: res.data.followDoc.following,
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
const getAllData = async (userId: string) => {
  let [data0, data1, data3] = await Promise.all([
    getUserPostList(userId),
    getFollowData(),
    getUserData(userId),
  ]);
  let data2 = await getPostsFromPostList(data0.posts);
  return { data0, data1, data2, data3 };
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
    follower: [],
    followingCount: 0,
    followerCount: 0,
    following: [],
  });
  const [userData, setUserData] = useState<GetUserData>({
    username: "",
  });
  const [postsData, setPostsData] = useState<GetPostData[] | null>(null);
  useEffect(() => {
    (async () => {
      setIsFetching(true);
      let { data0, data1, data2, data3 } = await getAllData(params.userId);
      setPostsData(data2);
      setPostListData(data0);
      setFollowData(data1);
      setUserData(data3);
      setIsFetching(false);
    })();
  }, []);
  const renderPostPreview = (data: GetPostData[]): React.ReactElement => {
    let ren = data.map((post) => {
      if (post.image !== "" && post.postId !== "")
        return (
          <a
            key={post.postId}
            className="PP__hoverContainer"
            onClick={() => {
              history.push(`/p/${post.postId}`);
              // setPostId(post.postId);
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
  const renderPostInRowOf3 = (data: GetPostData[]): React.ReactElement => {
    let dataCopy = data;
    let render = [];
    let rows = Math.ceil(data.length / 3);
    for (let i = 0; i < rows; i++) {
      let rowData = dataCopy.splice(0, 3);
      render.push(renderPostPreview(rowData));
    }
    // console.log(render);
    return <ul className="pp">{render}</ul>;
  };
  if (isFetching) {
    return <LoadingScreen></LoadingScreen>;
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
            <img src={userIn4.avatar} alt="" className="userIn4__avatar" />
          </div>
          <div className="userIn4Detail__container">
            <div className="userIn4Username__container">
              <h2 className="userIn4__username">{userData.username}</h2>
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
              <span className="userIn4__description">
                {userIn4.description}
              </span>
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
