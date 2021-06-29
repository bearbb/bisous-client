import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

interface SearchNNewPostProps {
  toggleNewPost?: () => void;
}
// const onEnterPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
// if (event.key === "Enter" && !credentialIsEmpty) {
// await signInHandler();
// }
// };
export const SearchNNewPost: React.FC<SearchNNewPostProps> = ({
  toggleNewPost,
}) => {
  const history = useHistory();
  const [searchContent, setSearchContent] = useState<string>("");
  const searchContentInputRef = useRef<HTMLInputElement>(null);
  const newPostHandler = () => {
    if (toggleNewPost) {
      toggleNewPost();
    } else {
    }
  };
  const searchContentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);
  };
  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchContent !== "") {
      // console.log("Pressed");
      history.push(`/search/${searchContent}`);
      // window.location.reload()
      setSearchContent("");
      searchContentInputRef.current!.value = "";
    }
  };

  return (
    <div className="SearchNNewPost">
      <div className="searchNNewPost__container">
        <div className="search__container">
          <FontAwesomeIcon icon={faSearch} className="search__icon" />
          <input
            type="text"
            className="search__input"
            placeholder="Search"
            onChange={(e) => {
              searchContentHandler(e);
            }}
            ref={searchContentInputRef}
            onKeyPress={(e) => {
              onEnterPress(e);
            }}
          />
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
