import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
interface UserPostData {
  posts: string[];
  postCount: number;
}
const getUserPostData = async (
  userId: string
): Promise<UserPostData | null> => {
  try {
    let res = await axiosInstance.get(`/users/${userId}/posts`);
    return {
      posts: res.data.posts,
      postCount: res.data.postCount,
    };
  } catch (err) {
    return null;
  }
};

export { getUserPostData };
