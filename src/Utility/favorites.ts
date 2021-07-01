import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});

const addPostToFavorite = async (postId: string) => {
  let res;
  try {
    let resp = await axiosInstance.post("/favorites", { postIdList: [postId] });
    res = resp.data;
  } catch (err) {
    // console.error(err);
    res = err.response;
  }
  return res;
};
const deletePostFromFavorite = async (postId: string) => {
  let res;
  try {
    let resp = await axiosInstance.delete(`/favorites/${postId}`);
    res = resp.data;
  } catch (error) {
    // console.error(error);
    res = error.response;
  }
  return res;
};

const getFavoriteList = async (): Promise<string[] | null> => {
  try {
    let resp = await axiosInstance.get("/favorites");
    return resp.data.favorite.favorites;
  } catch (error) {
    return null;
  }
};

export { addPostToFavorite, deletePostFromFavorite, getFavoriteList };
