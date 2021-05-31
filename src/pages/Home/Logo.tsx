import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/fontawesome-free-regular";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const faIcon = faHeart as IconProp;
interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <div className="Logo">
      <div className="logo__container">
        <FontAwesomeIcon icon={faIcon} />
        <span>Bisous</span>
      </div>
    </div>
  );
};
