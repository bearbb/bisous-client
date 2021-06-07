import React from "react";
import { SinglePost } from "pages/SinglePost/SinglePost";
import { Logo } from "pages/Header/Logo";
// import { Nav } from "pages/Header/Nav";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import "pages/SinglePost/SinglePostPage.css";
import avatar from "styles/images/avatar.webp";
import postImg from "styles/images/wallpaper.jpg";
import yuna from "styles/images/yuna.jpg";

interface like {
  _id: string;
  username: string;
}
export interface comment {
  _id: string;
  comment: string;
  author: {
    username: string;
    avatar: string;
  };
}
interface hashtag {
  _id: string;
  hashtag: string;
}
let testData = {
  pictures: yuna,
  likes: [
    {
      _id: "60bd8b513991652526115c25",
      username: "bearbbTest",
    },
  ],
  likeCount: 1,
  comments: [
    {
      _id: "60bd949a028faa5fb53bdbcc",
      comment: "test comment 13",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd93f62703875b27ecda9a",
      comment: "test comment 13",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 12, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
    {
      _id: "60bd9397143109595edd7d71",
      comment:
        "test comment 13, make it longer to create word break, u know bout this shit right?",
      author: {
        username: "bearbbTest",
        avatar: avatar,
      },
    },
  ],
  commentCount: 0,
  caption: "This is a caption 1",
  hashtags: [
    {
      _id: "607810b5ae4cce2b42afa28a",
      hashtag: "Hash0",
    },
    {
      _id: "607810b5ae4cce2b42afa28b",
      hashtag: "Hash1",
    },
  ],
  _id: "607810b5ae4cce2b42afa28c",
  author: {
    _id: "607648ca929187328ba674d7",
    username: "bearbb",
    avatar: avatar,
  },
  createdAt: "2021-04-15T10:08:53.040Z",
  updatedAt: "2021-06-07T03:38:02.184Z",
  __v: 12,
};
export interface PostData {
  pictures: string;
  likes: like[];
  likeCount: number;
  comments: comment[];
  commentCount: number;
  caption: string;
  hashtags: hashtag[];
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
}
interface SinglePostPageProps {}

export const SinglePostPage: React.FC<SinglePostPageProps> = ({}) => {
  return (
    <div className="SinglePostPage">
      <div className="feedsHeader__container">
        <div className="headerFlex__container">
          <Logo></Logo>
          <SearchNNewPost></SearchNNewPost>
          <Utility></Utility>
        </div>
      </div>
      <div className="SinglePostBody__container">
        <SinglePost {...testData}></SinglePost>
      </div>
    </div>
  );
};
