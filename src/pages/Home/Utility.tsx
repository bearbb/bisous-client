import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/fontawesome-free-regular";
import { faBars } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const MessageIcon = faEnvelope as IconProp;
const NotificationIcon = faBell as IconProp;
const OthersIcon = faBars as IconProp;

interface UtilityProps {}

export const Utility: React.FC<UtilityProps> = ({}) => {
  return (
    <div className="Utility">
      <div className="utility__container">
        <span className="utilityIcon__container">
          <FontAwesomeIcon icon={MessageIcon} className="utility__icon" />
        </span>
        <span className="utilityIcon__container">
          <FontAwesomeIcon icon={NotificationIcon} className="utility__icon" />
        </span>
        <span className="utilityIcon__container">
          <FontAwesomeIcon icon={OthersIcon} className="utility__icon" />
        </span>
      </div>
    </div>
  );
};
