import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { getUserName } from "Utility/user";
import { LoadingScreen } from "./LoadingScreen/LoadingScreen";
// import moduleName from 'reac'

interface AuthenticatedRouteProps {
  path: string;
  Component: any;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  Component,
  path,
}) => {
  //   let isLoggedIn: boolean = false;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const history = useHistory();
  async function onLoad() {
    try {
      setIsFetching(true);
      let userRes = await getUserName();
      // console.log(userRes);
      setIsLoggedIn(userRes.success);
      // console.log(isLoggedIn);
      setIsFetching(false);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    onLoad();
    // (async () => {
    //   await onLoad();
    // })();
  }, []);
  // console.log(isLoggedIn);
  if (isFetching) {
    return <LoadingScreen></LoadingScreen>;
  } else {
    if (isLoggedIn) {
      return <Route component={Component} path={path} exact></Route>;
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
};
