import React from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { Post } from "./Post";
import { SearchNNewPost } from "./SearchNNewPost";
import { User } from "./User";
import { Utility } from "./Utility";
import "../../styles/Feed.css";
import avatar from "../../styles/images/avatar.webp";
import postImg from "../../styles/images/wallpaper.jpg";

interface FeedsProps {}

export const Feeds: React.FC<FeedsProps> = ({}) => {
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
};
