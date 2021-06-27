import React, { useState, useEffect, useContext, createContext } from "react";
import { Logo } from "pages/Header/Logo";
import { Nav } from "pages/Header/Nav";
import { Post, PostProps } from "./Post";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { User } from "pages/SideNav/User";
import { Utility } from "pages/Header/Utility";
import "styles/Feed.css";
import avatar from "styles/images/avatar.webp";
import postImg from "styles/images/wallpaper.jpg";
import { LoadingScreen } from "pages/LoadingScreen/LoadingScreen";
import { useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";
import axiosInstance from "Utility/axios";
import { getFavoriteList } from "Utility/favorites";
import sleep from "Utility/sleep";
import { NewPost } from "pages/NewPost/NewPost";
import { useUserContext } from "Contexts/UserContext";
import { useFollowContext } from "Contexts/FollowContext";
interface FollowingData {
  _id: string;
  username: string;
  email: string;
}
interface GetUserData {
  // username?: string;
  // userId?: string;
  userData?: {
    username: string;
    userId: string;
    followerCount: number;
    followingCount: number;
    postCount: number;
    follower: FollowingData[];
    following: FollowingData[];
  };
  error?: {
    errorMsg: string;
  };
}
interface CommentData {
  comment: string;
  author: string;
}
interface HashtagData {
  _id: string;
  hashtag: string;
}
interface PostData {
  _id: string;
  __v: number;
  author: {
    _id: string;
    username: string;
    email?: string;
  };
  caption: string;
  commentCount: number;
  comments: string[];
  createdAt: string;
  hashtags: HashtagData[];
  likeCount: number;
  likes: string[];
  pictures: string[];
  updatedAt: string;
  // avatar?: string;
}
const getUserName = async (): Promise<GetUserData> => {
  let getUserData: GetUserData = {};
  try {
    let res = await axiosInstance.get("/users");
    let followRes = await axiosInstance.get("/follows");
    getUserData = {
      userData: {
        username: res.data.username,
        userId: res.data.userId,
        postCount: res.data.postCount,
        followerCount: followRes.data.followDoc.followerCount,
        followingCount: followRes.data.followDoc.followingCount,
        follower: followRes.data.followDoc.follower,
        following: followRes.data.followDoc.following,
      },
    };
    return getUserData;
  } catch (error) {
    // console.error(error.response);
    getUserData = { error: { errorMsg: error.response.data.message } };
    return getUserData;
  }
};

const getPostsData = async (): Promise<PostData[]> => {
  let postsData: PostData[] = [];
  try {
    let res = await axiosInstance.get("/posts");
    postsData = res.data;
    return postsData;
  } catch (err) {
    // console.error(err.response);
  }
  return postsData;
};
interface FeedsProps {}
interface PostDataWithAvatar extends PostData {
  avatar: string;
}
const getAuthorsAvatar = async (
  data: PostData[]
): Promise<PostDataWithAvatar[]> => {
  let postsData: PostDataWithAvatar[] = [];
  postsData = await Promise.all(
    data.map(async (d) => {
      let ava = avatar;
      return { ...d, avatar: ava };
    })
  );
  return postsData;
};

interface PostDataWithAvatarAndInteractionStatus extends PostDataWithAvatar {
  isLiked: boolean;
  isSaved: boolean;
}
const getLikedNSavedStatus = async (
  data: PostDataWithAvatar[],
  uData: GetUserData,
  favoriteList: string[]
): Promise<PostDataWithAvatarAndInteractionStatus[]> => {
  let returnData: PostDataWithAvatarAndInteractionStatus[] = [];
  returnData = data.map((d) => {
    let likeIndex = d.likes.findIndex((e) => e === uData.userData?.userId);
    let isLiked: boolean = likeIndex === -1 ? false : true;
    let saveIndex = favoriteList.findIndex((e) => e === d._id);
    let isSaved: boolean = saveIndex === -1 ? false : true;
    return { ...d, isLiked, isSaved };
  });
  return returnData;
};

const getImagesData = async (
  data: PostDataWithAvatarAndInteractionStatus[]
): Promise<PostDataWithAvatarAndInteractionStatus[]> => {
  let returnData: PostDataWithAvatarAndInteractionStatus[] = [];
  returnData = await Promise.all(
    data.map(async (e) => {
      return { ...e };
    })
  );
  return returnData;
};

const renderPost = (
  data: PostDataWithAvatarAndInteractionStatus[] | undefined
): React.ReactElement => {
  let render: React.ReactElement[] = [];
  if (data) {
    data
      // .slice(0)
      // .reverse()
      .forEach((post) => {
        render.push(
          <LazyLoad key={post._id}>
            <Post
              authorId={post.author._id}
              key={post._id}
              authorAvatar={post.avatar}
              postId={post._id}
              authorName={post.author.username}
              postImg={`https://application.swanoogie.me/api/images/${post.pictures[0]}`}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              saveCount={0}
              caption={post.caption}
              userAvatar={avatar}
              isLiked={post.isLiked}
              isSaved={post.isSaved}
            ></Post>
          </LazyLoad>
        );
      });
  }
  return <div className="Posts__container">{render}</div>;
};

export const Feeds: React.FC<FeedsProps> = ({}) => {
  let favoriteList: string[];
  const history = useHistory();
  const { userData, setUserData } = useUserContext();
  const { followData, setFollowData } = useFollowContext();
  const [userDetailData, setUserDetailData] = useState<GetUserData>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [toggleNewPost, setToggleNewPost] = useState<boolean>(false);
  const [fetchPostDataSignal, setFetchPostDataSignal] =
    useState<boolean>(false);
  const [postsData, setPostsData] =
    useState<PostDataWithAvatarAndInteractionStatus[]>();
  const FetchPostData = async () => {
    let getUserNameRes = await getUserName();
    if (getUserNameRes.error) {
      setIsLoggedIn(false);
    } else {
      // const userContext = createContext(getUserNameRes);
      setUserData({
        userId: getUserNameRes.userData!.userId,
        username: getUserNameRes.userData!.username,
      });
      console.log(getUserNameRes);
      let t = getUserNameRes.userData!.following;
      let t0 = t.map((obj) => {
        return obj._id;
      });
      let tt = getUserNameRes.userData!.follower;
      let tt0 = tt.map((obj) => {
        return obj._id;
      });
      setFollowData({
        follower: tt0,
        followerCount: getUserNameRes.userData!.followerCount,
        following: t0,
        followingCount: getUserNameRes.userData!.followingCount,
      });
      setUserDetailData(getUserNameRes);
      setIsLoggedIn(true);
      favoriteList = await getFavoriteList();
      let data = await getPostsData();
      let data2 = await getAuthorsAvatar(data);
      let data3 = await getLikedNSavedStatus(
        data2,
        getUserNameRes,
        favoriteList
      );
      let data4 = await getImagesData(data3);
      setPostsData(data4);
      await sleep(300);
    }
    setIsFetching(false);
  };
  useEffect(() => {
    // console.log();
    FetchPostData();
  }, []);
  useEffect(() => {
    if (fetchPostDataSignal) {
      FetchPostData();
      setFetchPostDataSignal(false);
    }
  }, [fetchPostDataSignal]);
  if (isFetching) {
    return <LoadingScreen></LoadingScreen>;
  } else {
    // console.log(isLoggedIn);
    if (!isLoggedIn) {
      history.push("/login");
    }
    return (
      <div className={`Feeds ${toggleNewPost ? "Feeds--flex" : ""}`}>
        <div
          className={`Feed__overlay ${
            toggleNewPost ? "Feed__overlay--enabled" : "Feed__overlay--disabled"
          }`}
          onClick={() => setToggleNewPost(!toggleNewPost)}
        ></div>
        {toggleNewPost ? (
          <NewPost
            toggleNewPost={() => setToggleNewPost(!toggleNewPost)}
            fetchNewPostData={() => setFetchPostDataSignal(true)}
          ></NewPost>
        ) : null}
        <div className="feedsHeader__container">
          <div className="headerFlex__container">
            <Logo></Logo>
            <SearchNNewPost
              toggleNewPost={() => {
                setToggleNewPost(!toggleNewPost);
              }}
            ></SearchNNewPost>
            <Utility></Utility>
          </div>
        </div>
        <div
          className={`feedBody__container ${
            toggleNewPost ? "feedBody__container--overlayed" : ""
          }`}
        >
          <div className="leftSide__Nav--fixed">
            <div className="feedsLeftSideNav__container">
              <User
                userAvatar={avatar}
                userName={userDetailData!.userData!.username}
                name="displayName"
                postCount={userDetailData!.userData!.postCount}
                followerCount={userDetailData!.userData!.followerCount}
                followingCount={userDetailData!.userData!.followingCount}
                userId={userDetailData!.userData!.userId}
              ></User>
              <Nav></Nav>
            </div>
          </div>
          <div className="Posts">{renderPost(postsData)}</div>
          <div className="feedRightSideTrending__container">
            <h3>Trending</h3>
          </div>
        </div>
      </div>
    );
  }
};
