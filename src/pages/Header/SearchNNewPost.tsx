import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

interface SearchNNewPostProps {
  toggleNewPost?: () => void;
}

export const SearchNNewPost: React.FC<SearchNNewPostProps> = ({
  toggleNewPost,
}) => {
  const newPostHandler = () => {
    if (toggleNewPost) {
      toggleNewPost();
    } else {
      // console.log(
      //   `%cCòn cái nịt `,
      //   "background: #292d3e; color: #f07178; font-weight: bold"
      // );
    }
  };
  return (
    <div className="SearchNNewPost">
      <div className="searchNNewPost__container">
        <div className="search__container">
          <FontAwesomeIcon icon={faSearch} className="search__icon" />
          <input type="text" className="search__input" placeholder="Search" />
        </div>
        <div className="newPost__container">
          <div className="newPost__button" onClick={newPostHandler}>
            <FontAwesomeIcon icon={faPlus} className="newPost__icon" />
            <span className="newPost__label">New post</span>
          </div>
        </div>
      </div>
    </div>
  );
};
