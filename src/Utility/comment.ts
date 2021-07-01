import axios from "axios";
// import { CommentData } from "pages/SinglePost/SinglePostPage";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});

const commentPost = async (postId: string, comment: string) => {
  let res;
  try {
    const resp = await axiosInstance.post(`/posts/${postId}/comments`, {
      comment,
    });
    res = resp.data;
  } catch (error) {
    // console.error(error);
    res = error.response;
  }
  return res;
};
export { commentPost };
