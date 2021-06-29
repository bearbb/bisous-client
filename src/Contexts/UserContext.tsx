import { createContext, useContext } from "react";

export type UserContent = {
  userData: {
    username: string;
    userId: string;
    avatar: string;
    isReady: boolean | null;
  };
  setUserData: (data: {
    username: string;
    userId: string;
    avatar: string;
    isReady: boolean | null;
  }) => void;
};

export const UserContext = createContext<UserContent>({
  userData: {
    username: "",
    userId: "",
    avatar: "",
    isReady: false,
  },
  setUserData: () => {},
});
export const useUserContext = () => useContext(UserContext);
