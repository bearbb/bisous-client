import React, { useState, useEffect } from "react";
import "./App.css";
import { Login } from "pages/Login";
import { Signup } from "pages/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Feeds } from "pages/Home/Feeds";
import { Message } from "pages/Message/Message";
import { SinglePostPage } from "pages/SinglePost/SinglePostPage";
import { UserDetail } from "pages/UserDetail/UserDetail";
import { LoadingScreen } from "pages/LoadingScreen/LoadingScreen";
import { NewPost } from "pages/NewPost/NewPost";
import { getUserName, GetUserData } from "Utility/user";
import { Preload } from "pages/Preload";
import { AuthenticatedRoute } from "pages/AuthenticatedRoute";
import { Socket } from "pages/Message/Socket";
//import context
import { UserContext } from "Contexts/UserContext";
import { FollowContext, FollowContent } from "Contexts/FollowContext";

function App() {
  //first call an api to check if user have logged in or not, if not then navigate to login page
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  interface userData {
    username: string;
    userId: string;
  }
  const [userData, setUserData] = useState<userData>({
    username: "",
    userId: "",
  });
  const [followData, setFollowData] = useState<FollowContent["followData"]>({
    follower: [""],
    followerCount: 0,
    following: [""],
    followingCount: 0,
  });
  return (
    <Router>
      <div className="App">
        <Switch>
          <FollowContext.Provider value={{ followData, setFollowData }}>
            <UserContext.Provider value={{ userData, setUserData }}>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/p/:postId" component={SinglePostPage} />
              <Route path="/user/:userId" component={UserDetail} exact />
              <Route path="/message" component={Message} exact />
              <Route path="/socket/:uid" component={Socket} />
              <AuthenticatedRoute path="/" Component={Feeds} />
            </UserContext.Provider>
          </FollowContext.Provider>
          {/* <AuthenticatedRoute path="/p/:postId" Component={SinglePostPage} /> */}
          {/* <Route path="/signup" exact component={Signup}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route
            path="/"
            exact
            render={() => (isLoggedIn ? <Feeds /> : <Redirect to="/login" />)}
          ></Route>
          <Route
            path="/message"
            exact
            render={() => (isLoggedIn ? <Message /> : <Redirect to="/login" />)}
          />
          <Route
            path="/p/:postId"
            exact
            render={() =>
              isLoggedIn ? <SinglePostPage /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/user"
            exact
            render={() =>
              isLoggedIn ? <UserDetail /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/loading"
            exact
            render={() =>
              isLoggedIn ? <UserDetail /> : <Redirect to="/login" />
            }
          />
          <Route path="/upload" exact component={NewPost} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
