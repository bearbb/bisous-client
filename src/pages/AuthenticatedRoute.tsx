import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useLoginStatusContext } from "Contexts/LoginStatusContenxt";
// import moduleName from 'reac'

interface AuthenticatedRouteProps {
  path: string;
  isExact: boolean;
  Component: any;
  renderFunc?: () => React.ReactElement;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  isExact,
  Component,
  path,
  renderFunc,
}) => {
  useEffect(() => {
    return () => {};
  }, []);
  const { loginStatusData } = useLoginStatusContext();
  if (loginStatusData.isLoggedIn) {
    if (renderFunc === undefined) {
      return <Route component={Component} path={path} exact={isExact}></Route>;
    } else {
      return <Route path={path} render={() => renderFunc()}></Route>;
    }
  } else {
    return <Redirect to="/login" exact={true}></Redirect>;
  }
};
