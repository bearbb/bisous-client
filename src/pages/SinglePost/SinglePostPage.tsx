import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import axiosInstance from "Utility/axios";
import { getOwnerData, GetUserData } from "Utility/user";
import { useUserContext } from "Contexts/UserContext";

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
interface SinglePostPageProps {}

export interface CommentData {
  _id: string;
  comment: string;
  author: {
    username: string;
    avatar: string;
  };
}
interface HashtagData {
  _id: string;
  hashtag: string;
}
interface LikeData {
  _id: string;
  username: string;
}
export interface GetPostData {
  _v: string;
  _id: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  caption: string;
  commentCount: number;
  comments: CommentData[];
  createdAt: string;
  hashtags: HashtagData[];
  likeCount: number;
  likes: LikeData[];
  pictures: string[];
  updatedAt: string;
  shareOnClickHandler: () => void;
  isLiked: boolean;
}
interface Params {
  postId: string;
}
const getPostData = async (postId: string): Promise<GetPostData> => {
  let res: GetPostData;
  try {
    const resp = await axiosInstance.get(`/posts/${postId}`);
    res = resp.data.post;
  } catch (error) {
    res = error.response;
  }
  return res;
};

export const SinglePostPage: React.FC<SinglePostPageProps> = ({}) => {
  const { userData: ownerData, setUserData: setOwnerData } = useUserContext();
  const params: Params = useParams();
  const [postData, setPostData] = useState<GetPostData>();
  const [toggleShare, setToggleShare] = useState(false);
  const shareOnClickHandler = () => {
    // console.log("Clicked ted");
    //toggle share on off
    setToggleShare(!toggleShare);
  };
  const outletClickHandler = () => {
    setToggleShare(!toggleShare);
  };
  useEffect(() => {
    // console.log(toggleShare);
    // console.log(
    //   `%cClicked`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    return () => {};
  }, [toggleShare]);
  useEffect(() => {
    (async () => {
      let res: GetPostData = await getPostData(params.postId);
      let imgUrl = `https://application.swanoogie.me/api/images/${res.pictures[0]}`;
      console.log(ownerData.userId);
      let likeIndex = res.likes.findIndex((e) => e._id === ownerData.userId);
      if (likeIndex !== -1) {
        res.isLiked = true;
      } else {
        res.isLiked = false;
      }
      res.pictures = [imgUrl];
      res.shareOnClickHandler = shareOnClickHandler;
      setPostData(res);
      // console.log(res);
    })();
  }, []);
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
        {postData ? <SinglePost {...postData}></SinglePost> : null}
      </div>
    </div>
  );
};
