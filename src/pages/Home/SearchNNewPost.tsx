import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

interface SearchNNewPostProps {}

export const SearchNNewPost: React.FC<SearchNNewPostProps> = ({}) => {
  return (
    <div className="SearchNNewPost">
      <div className="searchNNewPost__container">
        <div className="search__container">
          <FontAwesomeIcon icon={faSearch} className="search__icon" />
          <input type="text" className="search__input" placeholder="Search" />
        </div>
        <div className="newPost__container">
          <div className="newPost__button">
            <FontAwesomeIcon icon={faPlus} className="newPost__icon" />
            <span className="newPost__label">New post</span>
          </div>
        </div>
      </div>
    </div>
  );
};
