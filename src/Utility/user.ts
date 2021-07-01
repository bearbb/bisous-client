import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
export interface GetUserData {
  userData: {
    username: string;
    userId: string;
    avatar: string;
  };
}
const getOwnerData = async (): Promise<GetUserData | null> => {
  try {
    let res = await axiosInstance.get("/users");
    return {
      userData: {
        username: res.data.username,
        userId: res.data.userId,
        avatar: res.data.avatar,
      },
    };
  } catch (error) {
    // console.log("Unauthorized");
    // console.error(error);
    if (error.response) {
      // console.log(error.response);
    }
    return null;
  }
};
const getUserData = async (userId: string): Promise<GetUserData | null> => {
  try {
    let res = await axiosInstance.get(`/users/${userId}`);
    return {
      userData: {
        username: res.data.userDoc.username,
        userId,
        avatar: res.data.userDoc.avatar,
      },
    };
  } catch (err) {
    return null;
  }
};
const getLogInStatus = async (): Promise<boolean> => {
  try {
    let res = await axiosInstance.get("/users");
    return true;
  } catch (err) {
    return false;
  }
};
export { getOwnerData, getUserData, getLogInStatus };
