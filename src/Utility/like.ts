import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
const likePost = async (postId: string) => {
  try {
    let res = await axiosInstance.post(`/posts/${postId}/likes`);
    // console.log(res);
    return res.data;
  } catch (err) {
    // console.error(err);
    return { error: err.response };
  }
};
const unlikePost = async (postId: string) => {
  try {
    let res = await axiosInstance.delete(`/posts/${postId}/likes`);
    // console.log(res);
    return res.data;
  } catch (err) {
    // console.error(err);
    return { error: err.response };
  }
};
export { likePost, unlikePost };
