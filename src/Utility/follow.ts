import axios from "axios";
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
export { followUser, unFollowUser };
