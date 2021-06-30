import React, { useState, useReducer, useEffect } from "react";
import { Feeds } from "pages/Home/Feeds";
import { Redirect } from "react-router";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    console.log("ss");
    forceUpdate();
    return () => {};
  }, []);
  return <Redirect to="/" exact={true}></Redirect>;
};
