import React, { useState, useEffect } from "react";
import { SinglePost } from "pages/SinglePost/SinglePost";
import { Logo } from "pages/Header/Logo";
// import { Nav } from "pages/Header/Nav";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import "pages/SinglePost/SinglePostPage.css";
import avatar from "styles/images/avatar.webp";
import postImg from "styles/images/wallpaper.jpg";
import yuna from "styles/images/yuna.jpg";
import yuna2 from "styles/images/yuna2.jpg";
import { Share } from "./Share";

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
  pictures: yuna2,
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
  // _id: "607810b5ae4cce2b42afa28c",
  author: {
    _id: "607648ca929187328ba674d7",
    username: "bearbb",
    avatar: avatar,
  },
  createdAt: "2021-04-15T10:08:53.040Z",
  // updatedAt: "2021-06-07T03:38:02.184Z",
  // __v: 12,
  // shareHandler
};
const friends = [
  {
    friendName: "UnUn",
    friendId: "fr01",
    friendAvatar: avatar,
  },
  {
    friendId: "fr02",
    friendName: "hoa__nt",
    friendAvatar: avatar,
  },
  {
    friendId: "fr03",
    friendName: "hoa__nt1",
    friendAvatar: avatar,
  },
  {
    friendId: "fr04",
    friendName: "hoa__nt2",
    friendAvatar: avatar,
  },
  {
    friendId: "fr05",
    friendName: "hoa__nt3",
    friendAvatar: avatar,
  },
  {
    friendId: "fr06",
    friendName: "hoa__nt4",
    friendAvatar: avatar,
  },
  {
    friendId: "fr07",
    friendName: "hoa__nt5",
    friendAvatar: avatar,
  },
  {
    friendId: "fr08",
    friendName: "hoa__nt6",
    friendAvatar: avatar,
  },
  {
    friendId: "fr09",
    friendName: "hoa__nt7",
    friendAvatar: avatar,
  },
  {
    friendId: "fr10",
    friendName: "hoa__nt8",
    friendAvatar: avatar,
  },
  {
    friendId: "fr12",
    friendName: "hoa__nt9",
    friendAvatar: avatar,
  },
  {
    friendId: "fr13",
    friendName: "hoa__nt10",
    friendAvatar: avatar,
  },
  {
    friendId: "fr14",
    friendName: "hoa__nt11",
    friendAvatar: avatar,
  },
  {
    friendId: "fr15",
    friendName: "hoa__nt12",
    friendAvatar: avatar,
  },
  {
    friendId: "fr16",
    friendName: "hoa__nt13",
    friendAvatar: avatar,
  },
  {
    friendId: "fr17",
    friendName: "hoa__nt14",
    friendAvatar: avatar,
  },
];
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
  // __id: string;
  shareOnClickHandler: () => void;
  // shareHand
}
interface SinglePostPageProps {}

export const SinglePostPage: React.FC<SinglePostPageProps> = ({}) => {
  const [toggleShare, setToggleShare] = useState(false);
  const shareOnClickHandler = () => {
    console.log("Clicked ted");
    //toggle share on off
    setToggleShare(!toggleShare);
  };
  const outletClickHandler = () => {
    setToggleShare(!toggleShare);
  };
  useEffect(() => {
    console.log(toggleShare);
    console.log(
      `%cClicked`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    return () => {};
  }, [toggleShare]);
  let temp: PostData = {
    ...testData,
    shareOnClickHandler: shareOnClickHandler,
  };
  return (
    <div className="SinglePostPage">
      <div
        onClick={outletClickHandler}
        className={`SinglePostPage__overlay ${
          toggleShare ? "spp__overlay--enabled" : "spp__overlay--disabled"
        }`}
      ></div>
      {toggleShare ? (
        <Share friendList={friends} postId="607810b5ae4cce2b42afa28c"></Share>
      ) : null}
      <div className="SinglePostPage__share"></div>
      <div className="feedsHeader__container">
        <div className="headerFlex__container">
          <Logo></Logo>
          <SearchNNewPost></SearchNNewPost>
          <Utility></Utility>
        </div>
      </div>
      <div className="SinglePostBody__container">
        <SinglePost {...temp}></SinglePost>
      </div>
    </div>
  );
};
