import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/fontawesome-free-regular";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../../styles/Feed__nav.css";
const SaveIcon = faBookmark as IconProp;
interface NavProps {}

export const Nav: React.FC<NavProps> = ({}) => {
  return (
    <div className="Nav">
      <div className="nav__container">
        <div className="nav__home nav__element">
          <div className="nav__iconContainer">
            <div className="nav__elementIndicator indicator--activated"></div>
            <FontAwesomeIcon icon={faHome} className="nav__icon" />
          </div>
          <div className="nav__labelContainer">
            <span className="nav__label">Home</span>
          </div>
        </div>
        <div className="nav__element nav__save">
          <div className="nav__iconContainer">
            <div className="nav__elementIndicator"></div>
            <FontAwesomeIcon icon={SaveIcon} className="nav__icon" />
          </div>
          <div className="nav__labelContainer">
            <span className="nav__label">Save</span>
          </div>
        </div>
      </div>
    </div>
  );
};
