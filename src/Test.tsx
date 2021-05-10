import React from "react";
import "./styles/Test.css";
interface TestProps {}

export const Test: React.FC<TestProps> = ({}) => {
  return (
    <div id="body">
      <div id="nav">Nav</div>
      <div id="content">Content</div>
    </div>
  );
};
