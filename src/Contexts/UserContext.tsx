import { createContext, useContext } from "react";

interface userData {
  username: string;
  userId: string;
}

interface UserState {
  state: {
    username: string;
    userId: string;
  };
  setState: React.Dispatch<React.SetStateAction<userData | null>>;
}

export type UserContent = {
  userData: {
    username: string;
    userId: string;
  };
  setUserData: (data: { username: string; userId: string }) => void;
};

export const UserContext = createContext<UserContent>({
  userData: {
    username: "",
    userId: "",
  },
  setUserData: () => {},
});
export const useUserContext = () => useContext(UserContext);
