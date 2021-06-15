import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
export interface GetUserData {
  username?: string;
  userId?: string;
  error?: {
    errorMsg: string;
  };
}
const getUserName = async (): Promise<GetUserData> => {
  let userData: GetUserData = {};
  try {
    let res = await axiosInstance.get("/users");
    userData = { username: res.data.username, userId: res.data.userId };
    return userData;
  } catch (error) {
    console.error(error.response);
    userData = { error: { errorMsg: error.response.data.message } };
    return userData;
  }
};
export { getUserName };
