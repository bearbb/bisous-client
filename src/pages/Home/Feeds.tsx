import React, { useState, useEffect } from "react";
import { Logo } from "pages/Header/Logo";
import { Nav } from "pages/Header/Nav";
import { Post } from "./Post";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { User } from "pages/SideNav/User";
import { Utility } from "pages/Header/Utility";
import "styles/Feed.css";
import avatar from "styles/images/avatar.webp";
import postImg from "styles/images/wallpaper.jpg";
import { LoadingScreen } from "pages/LoadingScreen/LoadingScreen";
import { useHistory } from "react-router-dom";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
const getUserName = async (): Promise<string> => {
  try {
    let res = await axiosInstance.get("/users");
    console.log(res);
    return res.data.username;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

interface FeedsProps {}

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
  useEffect(() => {
    console.log();
    (async () => {
      // const res: boolean = await responseAfterSeconds(false);

      // setIsLoggedIn(res);
      let userName = await getUserName();
      console.log(userName);
      setIsLoggedIn(true);
      console.log(isLoggedIn);
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
          <div className="Posts">
            <Post
              authorAvatar={avatar}
              userAvatar={avatar}
              postId="post01"
              postImg={postImg}
              commentCount={20}
              likeCount={200}
              shareCount={300}
              saveCount={20}
              authorName="Bear BB"
              caption="This is a caption"
              isLiked={true}
              isShared={false}
              isSaved={false}
            ></Post>
            <Post
              authorAvatar={avatar}
              userAvatar={avatar}
              postId="post01"
              postImg={postImg}
              commentCount={20}
              likeCount={200}
              shareCount={300}
              saveCount={20}
              authorName="Bear BB"
              caption="This is a caption"
              isLiked={true}
              isShared={false}
              isSaved={false}
            ></Post>
          </div>
          <div className="feedRightSideTrending__container">
            <h3>Trending</h3>
          </div>
        </div>
      </div>
    );
  }
};
