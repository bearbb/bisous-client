import React, { useEffect, useState } from "react";
import avatar from "styles/images/avatar.webp";
import axiosInstance from "Utility/axios";
import { useParams, withRouter, useHistory } from "react-router-dom";
import { Logo } from "pages/Header/Logo";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import { useUserContext } from "Contexts/UserContext";
import { useFavoriteContext } from "Contexts/FavoriteContext";
import { ImgPrefix } from "Utility/avatar";
import "./Search.css";
import {
  getAuthorsAvatar,
  getLikedNSavedStatus,
  PostDataWithAvatarAndInteractionStatus,
  PostData,
  renderPost,
} from "pages/Home/Feeds";
import { LoadingCube } from "pages/LoadingScreen/LoadingCube";

interface SearchProps {}

interface SearchParams {
  searchContent: string;
}
interface PostDetailData extends PostDataWithAvatarAndInteractionStatus {}
interface UserData {
  username: string;
  userId: string;
  avatar: any;
}
interface UserDataWithFollowerCount extends UserData {
  followerCount: number;
  followingCount: number;
}
const getUserFollow = async (
  data: UserData[]
): Promise<UserDataWithFollowerCount[]> => {
  let returnData: UserDataWithFollowerCount[] = await Promise.all(
    data.map(async (user) => {
      let followDoc = await axiosInstance.get(`/follows/${user.userId}`);
      return {
        ...user,
        followerCount: followDoc.data.followDoc.followerCount,
        followingCount: followDoc.data.followDoc.followingCount,
      };
    })
  );
  return returnData;
};
const renderUser = (
  data: UserDataWithFollowerCount[],
  navFunc: (d: string) => void
): React.ReactElement => {
  let ren = data.map((user) => {
    return (
      <div className="UP__container" key={user.userId}>
        <div
          className="UP__avatarContainer"
          onClick={() => {
            navFunc(user.userId);
          }}
        >
          <img
            src={`${ImgPrefix}/${user.avatar}`}
            alt=""
            className="UP__avatar avatar"
          />
        </div>
        <div className="UP__detailContainer">
          <span
            className="UP__username"
            onClick={() => {
              navFunc(user.userId);
            }}
          >
            {user.username}
          </span>
          <div className="UP__followCountContainer">
            <div className="UP__followerCountContainer">
              <span className="UP__followerCount">{`${user.followerCount} ${
                user.followerCount >= 2 ? "followers" : "follower"
              }`}</span>
            </div>
            <span className="UP__followCountSeparation"> · </span>
            <div className="UP__followingCountContainer">
              <span className="UP__followingCount">
                {`${user.followingCount} following`}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className="UserPreview">{ren}</div>;
};
const Search: React.FC<SearchProps> = ({}) => {
  const history = useHistory();
  const { userData, setUserData } = useUserContext();
  const { favoriteData, setFavoriteData } = useFavoriteContext();
  const [postSearchData, setPostSearchData] =
    useState<PostDetailData[] | null>(null);
  const [userSearchData, setUserSearchData] =
    useState<UserDataWithFollowerCount[] | null>(null);
  const params: SearchParams = useParams();
  useEffect(() => {
    const getSearchData = async (searchContent: string) => {
      let res = await axiosInstance.get(`/search/${searchContent}`);
      // console.log(res.data);
      let postDoc: PostData[] = res.data.postDoc;
      let userSearchDoc: UserData[] = res.data.userData;
      let temp1 = await getAuthorsAvatar(postDoc, userData.avatar);
      let temp2 = await getLikedNSavedStatus(
        temp1,
        userData.userId,
        favoriteData.favoriteList
      );
      // console.log(temp2);
      setPostSearchData(temp2);
      // console.log(userSearchDoc);
      let temp3 = await getUserFollow(userSearchDoc);
      setUserSearchData(temp3);
      // console.log(userSearchData);
    };
    getSearchData(params.searchContent);
    return () => {};
  }, []);
  const navToUserDetailPage = (userId: string) => {
    history.push(`/user/${userId}`);
  };
  if (postSearchData === null || userSearchData === null) {
    return <LoadingCube></LoadingCube>;
  }
  return (
    <div className="Search">
      <div className="feedsHeader__container">
        <div className="headerFlex__container">
          <Logo></Logo>
          <SearchNNewPost></SearchNNewPost>
          <Utility></Utility>
        </div>
      </div>
      <div className="searchBody__container">
        <div className="userSearch__container">
          <div className="searchDescription__container">
            <span className="userSearch__description searchResult__description">
              USERS
            </span>
          </div>
          {userSearchData === null ? (
            "Loading"
          ) : userSearchData.length === 0 ? (
            <div className="search__resultContainer">
              <span className="search__result--notFound userSearch__result--notFound">
                No user was found
              </span>
            </div>
          ) : (
            renderUser(userSearchData, navToUserDetailPage)
          )}
        </div>
        <div className="postSearch__container">
          <div className="searchDescription__container">
            <span className="postSearch__description searchResult__description">
              POSTS
            </span>
          </div>
          {postSearchData === null ? (
            "Loading"
          ) : postSearchData.length === 0 ? (
            <div className="search__resultContainer">
              <span className="search__result--notFound postSearch__result--notFound">
                No post was found
              </span>
            </div>
          ) : (
            renderPost(postSearchData)
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Search);
