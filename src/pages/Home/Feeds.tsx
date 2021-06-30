import React, {
  useReducer,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { Logo } from "pages/Header/Logo";
import { Nav } from "pages/Header/Nav";
import { Post, PostProps } from "./Post";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { User } from "pages/SideNav/User";
import { Utility } from "pages/Header/Utility";
import "styles/Feed.css";
import avatar from "styles/images/avatar.webp";
import { LoadingScreen } from "pages/LoadingScreen/LoadingScreen";
import { LoadingCube } from "pages/LoadingScreen/LoadingCube";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import LazyLoad from "react-lazyload";
import axiosInstance from "Utility/axios";
import { getFavoriteList } from "Utility/favorites";
import sleep from "Utility/sleep";
import { NewPost } from "pages/NewPost/NewPost";
import { useUserContext } from "Contexts/UserContext";
import { useFollowContext } from "Contexts/FollowContext";
import { useFavoriteContext } from "Contexts/FavoriteContext";
import { getUserData, getOwnerData } from "Utility/user";
import { getOwnerFollowData } from "Utility/follow";
import { getUserPostData } from "Utility/post";
interface HashtagData {
  _id: string;
  hashtag: string;
}
export interface PostData {
  _id: string;
  __v: number;
  author: {
    _id: string;
    username: string;
    email?: string;
    avatar: string;
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
interface FeedsProps {
  init: boolean;
}
export interface PostDataWithAvatar extends PostData {
  ownerAvatar: string;
}
export const getAuthorsAvatar = async (
  data: PostData[],
  ownerAvatar: string
): Promise<PostDataWithAvatar[]> => {
  let postsData: PostDataWithAvatar[] = [];
  postsData = await Promise.all(
    data.map(async (d) => {
      let ava = `https://application.swanoogie.me/api/images/${ownerAvatar}`;
      return { ...d, ownerAvatar: ava };
    })
  );
  return postsData;
};

export interface PostDataWithAvatarAndInteractionStatus
  extends PostDataWithAvatar {
  isLiked: boolean;
  isSaved: boolean;
}
export const getLikedNSavedStatus = async (
  data: PostDataWithAvatar[],
  userId: string,
  favoriteList: string[]
): Promise<PostDataWithAvatarAndInteractionStatus[]> => {
  let returnData: PostDataWithAvatarAndInteractionStatus[] = [];
  returnData = data.map((d) => {
    let likeIndex = d.likes.findIndex((e) => e === userId);
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

export const renderPost = (
  data: PostDataWithAvatarAndInteractionStatus[] | undefined
): React.ReactElement => {
  let render: React.ReactElement[] = [];
  if (data) {
    data.forEach((post) => {
      render.push(
        <LazyLoad key={post._id}>
          <Post
            authorId={post.author._id}
            key={post._id}
            authorAvatar={
              post.author.avatar
                ? `https://application.swanoogie.me/api/images/${post.author.avatar}`
                : "https://application.swanoogie.me/api/images/60dac0a31fc8b842473cd857"
            }
            postId={post._id}
            authorName={post.author.username}
            postImg={`https://application.swanoogie.me/api/images/${post.pictures[0]}`}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            saveCount={0}
            caption={post.caption}
            userAvatar={post.ownerAvatar}
            isLiked={post.isLiked}
            isSaved={post.isSaved}
          ></Post>
        </LazyLoad>
      );
    });
  }
  return <div className="Posts__container">{render}</div>;
};

export const Feeds: React.FC<FeedsProps> = ({ init }) => {
  const history = useHistory();
  const { userData: ownerData, setUserData: setOwnerData } = useUserContext();
  const { followData: ownerFollowData, setFollowData: setOwnerFollowData } =
    useFollowContext();
  const { favoriteData, setFavoriteData } = useFavoriteContext();
  const [postCount, setPostCount] = useState<number>(0);
  const [toggleNewPost, setToggleNewPost] = useState<boolean>(false);
  const [initSignal, setInitSignal] = useState<boolean | null>();
  useEffect(() => {
    console.log(ownerData);
    setInitSignal(init);
    FetchPostData();
    getUserPosts();
  }, []);
  const [fetchPostDataSignal, setFetchPostDataSignal] =
    useState<boolean>(false);
  const [postsData, setPostsData] =
    useState<PostDataWithAvatarAndInteractionStatus[] | null>(null);
  //Get all owner data
  const getAllOwnerData = async () => {
    let [ownerData, ownerFollowData, ownerFavorites] = await Promise.all([
      getOwnerData(),
      getOwnerFollowData(),
      getFavoriteList(),
    ]);
    if (
      ownerData !== null &&
      ownerFollowData !== null &&
      ownerFavorites !== null
    ) {
      let ownerPostData = await getUserPostData(ownerData.userData.userId);
      console.log(ownerPostData);
      if (ownerPostData !== null) {
        setPostCount(ownerPostData.postCount);
        setOwnerData({ ...ownerData.userData, isReady: true });
        setOwnerFollowData(ownerFollowData);
        setFavoriteData({ favoriteList: ownerFavorites });
      }
    }
  };
  const getUserPosts = async () => {
    let ownerPostData = await getUserPostData(ownerData.userId);
    if (ownerPostData !== null) {
      setPostCount(ownerPostData.postCount);
    }
  };
  const FetchPostData = async () => {
    let data = await getPostsData();
    let data2 = await getAuthorsAvatar(data, ownerData.avatar);
    let data3 = await getLikedNSavedStatus(
      data2,
      ownerData.userId,
      favoriteData.favoriteList
    );
    let data4 = await getImagesData(data3);
    setPostsData(data4);
    await sleep(300);
  };
  useEffect(() => {
    console.log(ownerData);
  }, []);
  useEffect(() => {
    if (fetchPostDataSignal) {
      FetchPostData();
      setFetchPostDataSignal(false);
    }
  }, [fetchPostDataSignal]);
  if (ownerData.username === "") {
    return <Redirect to="/login" exact></Redirect>;
  } else {
    if (postsData === null) {
      //TODO: return a skeleton loading posts
      // return <LoadingCube></LoadingCube>;
      return <div className="Loading">Loading</div>;
    } else {
      return (
        <div className={`Feeds ${toggleNewPost ? "Feeds--flex" : ""}`}>
          <div
            className={`Feed__overlay ${
              toggleNewPost
                ? "Feed__overlay--enabled"
                : "Feed__overlay--disabled"
            }`}
            onClick={() => setToggleNewPost(!toggleNewPost)}
          ></div>
          {toggleNewPost ? (
            <NewPost
              toggleNewPost={() => setToggleNewPost(!toggleNewPost)}
              fetchNewPostData={() => setFetchPostDataSignal(true)}
              avatarId={ownerData.avatar}
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
                  userAvatar={ownerData.avatar}
                  userName={ownerData.username}
                  name="displayName"
                  postCount={postCount}
                  followerCount={ownerFollowData.followerCount}
                  followingCount={ownerFollowData.followingCount}
                  userId={ownerData.userId}
                ></User>
                <Nav></Nav>
              </div>
            </div>
            <div className="Posts">{renderPost(postsData)}</div>
            <div className="feedRightSideTrending__container">
              {/* <h3>Trending</h3> */}
            </div>
          </div>
        </div>
      );
    }
  }
};
