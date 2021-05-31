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
        <Logo></Logo>
        <SearchNNewPost></SearchNNewPost>
        <Utility></Utility>
      </div>
      <div className="feedBody__container">
        <div className="feedsLeftSideNav__container">
          <User></User>
          <Nav></Nav>
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
        </div>
        <div className="feedRightSideTrending__container"></div>
      </div>
    </div>
  );
};
