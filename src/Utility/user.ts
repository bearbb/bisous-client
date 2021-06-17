import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
export interface GetUserData {
  success: boolean;
  username?: string;
  userId?: string;
  error?: {
    errorMsg: string;
  };
}
const getUserName = async (): Promise<GetUserData> => {
  let userData: GetUserData = { success: false };
  try {
    let res = await axiosInstance.get("/users");
    userData = {
      success: res.data.success,
      username: res.data.username,
      userId: res.data.userId,
    };
    return userData;
  } catch (error) {
    console.error(error.response);
    userData = {
      success: error.response.data.success,
      error: { errorMsg: error.response.data.message },
    };
    return userData;
  }
};
export { getUserName };
