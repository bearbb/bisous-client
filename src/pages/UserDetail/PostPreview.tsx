import React from "react";
import { GetPostListData } from "pages/UserDetail/UserDetail";

interface PostPreviewProps {}

export const PostPreview: React.FC<GetPostListData[]> = (postsData) => {
  console.log(postsData);
  return <div className="div"></div>;
};
