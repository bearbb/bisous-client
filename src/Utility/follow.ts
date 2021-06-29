import axios from "axios";
import { stringify } from "querystring";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
const followUser = async (userId: string) => {
  let res = await axiosInstance.post(`/follows/${userId}`);
  return res.data.success;
};
const unFollowUser = async (userId: string) => {
  let res = await axiosInstance.delete(`/follows/${userId}`);
  return res.data.success;
};
export interface FollowData {
  follower: string[];
  followerCount: number;
  following: string[];
  followingCount: number;
}
const getOwnerFollowData = async (): Promise<FollowData | null> => {
  try {
    let res = await axiosInstance.get(`/follows`);
    interface Follow {
      _id: string;
      username: string;
    }
    let follower = res.data.followDoc.follower.map((obj: Follow) => obj._id);
    let following = res.data.followDoc.following.map((obj: Follow) => obj._id);
    return {
      follower,
      following,
      followerCount: res.data.followDoc.followerCount,
      followingCount: res.data.followDoc.followingCount,
    };
  } catch (err) {
    return null;
  }
};
const getFollowData = async (userId: string): Promise<FollowData | null> => {
  try {
    let res = await axiosInstance.get(`/follows/${userId}`);
    interface Follow {
      _id: string;
      username: string;
    }
    let follower = res.data.followDoc.follower.map((obj: Follow) => obj._id);
    let following = res.data.followDoc.following.map((obj: Follow) => obj._id);
    return {
      follower,
      following,
      followerCount: res.data.followDoc.followerCount,
      followingCount: res.data.followDoc.followingCount,
    };
  } catch (err) {
    return null;
  }
};
export { followUser, unFollowUser, getFollowData, getOwnerFollowData };
