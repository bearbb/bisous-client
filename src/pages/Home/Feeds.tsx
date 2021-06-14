import React, { useState, useEffect } from "react";
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
import axios from "axios";
import sleep from "Utility/sleep";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
interface GetUserData {
  username?: string;
  userId?: string;
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
  let userData: GetUserData = {};
  try {
    let res = await axiosInstance.get("/users");
    userData = { username: res.data.username, userId: res.data.userId };
    return userData;
  } catch (error) {
    console.error(error.response);
    userData = { error: { errorMsg: error.response.data.message } };
    return userData;
  }
};

const getImg = async (imgId: string): Promise<string> => {
  let resp = await axiosInstance.get(`/images/${imgId}`);
  return resp.data;
};
const getPostsData = async (): Promise<PostData[]> => {
  let postsData: PostData[] = [];
  try {
    let res = await axiosInstance.get("/posts");
    postsData = res.data;
    return postsData;
  } catch (err) {
    console.error(err.response);
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
  uData: GetUserData
): Promise<PostDataWithAvatarAndInteractionStatus[]> => {
  let returnData: PostDataWithAvatarAndInteractionStatus[] = [];
  returnData = data.map((d) => {
    let likeIndex = d.likes.findIndex((e) => e === uData.userId);
    let isLiked: boolean = likeIndex === -1 ? false : true;
    return { ...d, isLiked, isSaved: false };
  });
  return returnData;
};

const getImagesData = async (
  data: PostDataWithAvatarAndInteractionStatus[]
): Promise<PostDataWithAvatarAndInteractionStatus[]> => {
  let returnData: PostDataWithAvatarAndInteractionStatus[] = [];
  returnData = await Promise.all(
    data.map(async (e) => {
      // let img = await getImg(e.pictures[0]);
      // e.pictures = [img];
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
    data.forEach((post) => {
      render.push(
        <LazyLoad>
          <Post
            key={post._id}
            authorAvatar={post.avatar}
            postId={post._id}
            authorName={post.author.username}
            // postImg={post.pictures[0]}
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
  const history = useHistory();
  function responseAfterSeconds(bool: boolean): Promise<boolean> {
    return new Promise((res) => {
      setTimeout(() => {
        res(bool);
      }, 5555);
    });
  }
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [postsData, setPostsData] =
    useState<PostDataWithAvatarAndInteractionStatus[]>();
  useEffect(() => {
    console.log();
    (async () => {
      let getUserNameRes = await getUserName();
      let data = await getPostsData();
      let data2 = await getAuthorsAvatar(data);
      let data3 = await getLikedNSavedStatus(data2, getUserNameRes);
      let data4 = await getImagesData(data3);
      setPostsData(data4);
      console.log(data4);
      await sleep(300);
      if (getUserNameRes.error) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsFetching(false);
    })();
  }, []);
  if (isFetching) {
    return <LoadingScreen></LoadingScreen>;
  } else {
    if (!isLoggedIn) {
      history.push("/login");
    }
    return (
      <div className="Feeds">
        <div className="feedsHeader__container">
          <div className="headerFlex__container">
            <Logo></Logo>
            <SearchNNewPost></SearchNNewPost>
            <Utility></Utility>
          </div>
        </div>
        <div className="feedBody__container">
          <div className="leftSide__Nav--fixed">
            <div className="feedsLeftSideNav__container">
              <User
                userAvatar={avatar}
                userName="Bear BB"
                name="Hieu Nguyen"
                postCount={30}
                followerCount={40}
                followingCount={499}
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
