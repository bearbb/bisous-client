import { useContext, createContext } from "react";
export type FollowContent = {
  followData: {
    follower: string[];
    followerCount: number;
    following: string[];
    followingCount: number;
  };
  setFollowData: (data: FollowContent["followData"]) => void;
};
export const FollowContext = createContext<FollowContent>({
  followData: {
    follower: [""],
    followerCount: 0,
    following: [""],
    followingCount: 0,
  },
  setFollowData: () => {},
});

export const useFollowContext = () => useContext(FollowContext);
