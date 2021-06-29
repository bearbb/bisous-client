import { useContext, createContext } from "react";
export type LoginStatusContent = {
  loginStatusData: {
    isLoggedIn: boolean | null;
  };
  setLoginStatusData: (data: LoginStatusContent["loginStatusData"]) => void;
};
export const LoginStatusContext = createContext<LoginStatusContent>({
  loginStatusData: {
    isLoggedIn: false,
  },
  setLoginStatusData: () => {},
});
export const useLoginStatusContext = () => useContext(LoginStatusContext);
