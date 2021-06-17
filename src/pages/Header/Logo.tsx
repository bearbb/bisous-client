import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/fontawesome-free-regular";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// const faIcon = faHeart as IconProp;
interface LogoProps {}

const LOGO = "BISOUS";
export const Logo: React.FC<LogoProps> = ({}) => {
  const history = useHistory();
  const logoHandler = () => {
    history.push("/");
  };
  return (
    <div className="Logo">
      <div className="logo__container">
        {/* <FontAwesomeIcon icon={faIcon} /> */}
        <span onClick={logoHandler}>{LOGO}</span>
      </div>
    </div>
  );
};
