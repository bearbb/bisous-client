import { useState, useEffect } from "react";
import "./App.css";
import { Login } from "pages/Login";
import { Signup } from "pages/Signup";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Feeds } from "pages/Home/Feeds";
// import { Message } from "pages/Message/Message";
import { SinglePostPage } from "pages/SinglePost/SinglePostPage";
import { UserDetail } from "pages/UserDetail/UserDetail";
// import { LoadingScreen } from "pages/LoadingScreen/LoadingScreen";
// import { NewPost } from "pages/NewPost/NewPost";
import { AuthenticatedRoute } from "pages/AuthenticatedRoute";
// import { Socket } from "pages/Message/Socket";
//import context
import { UserContext, UserContent } from "Contexts/UserContext";
import { FollowContext, FollowContent } from "Contexts/FollowContext";
import { FavoriteContent, FavoriteContext } from "Contexts/FavoriteContext";
import {
  LoginStatusContext,
  LoginStatusContent,
} from "Contexts/LoginStatusContenxt";
import Search from "pages/Search/Search";
// import history from "Utility/history";
import { getFavoriteList } from "Utility/favorites";
import { getOwnerFollowData } from "Utility/follow";
import { getLogInStatus, getOwnerData } from "Utility/user";
// import sleep from "Utility/sleep";
// import { getUserPostData } from "Utility/post";
import { EditProfile } from "pages/EditProfilePage/EditProfile";
// import { Home } from "pages/Home/Home";
import { LoadingCube } from "pages/LoadingScreen/LoadingCube";

function App() {
  const [userData, setUserData] = useState<UserContent["userData"]>({
    username: "",
    avatar: "",
    userId: "",
    isReady: false,
  });
  const [followData, setFollowData] = useState<FollowContent["followData"]>({
    follower: [""],
    followerCount: 0,
    following: [""],
    followingCount: 0,
  });
  const [loginStatusData, setLoginStatusData] = useState<
    LoginStatusContent["loginStatusData"]
  >({
    isLoggedIn: null,
  });
  //first call an api to check if user have logged in or not, if not then navigate to login page
  const getLoggedInStatus = async () => {
    let res = await getLogInStatus();
    setLoginStatusData({ isLoggedIn: res });
    //User logged in
    if (res) {
      // console.log(res);
      await getAllOwnerData();
    } else {
      setUserData({ ...userData, isReady: true });
    }
  };
  const getAllOwnerData = async () => {
    let [ownerData, ownerFollowData, ownerFavorites] = await Promise.all([
      getOwnerData(),
      getOwnerFollowData(),
      getFavoriteList(),
    ]);
    if (
      ownerData !== null &&
      ownerFollowData !== null &&
      ownerFavorites !== null
    ) {
      setUserData({ ...ownerData.userData, isReady: true });
      setFavoriteData({ favoriteList: ownerFavorites });
      setFollowData(ownerFollowData);
    }
  };
  useEffect(() => {
    getLoggedInStatus();
  }, []);
  // useEffect(() => {
  //   console.log(loginStatusData);
  //   if (loginStatusData.isLoggedIn) {
  //     getAllOwnerData();
  //   } else {
  //     setUserData({ ...userData, isReady: false });
  //   }
  // }, [loginStatusData]);
  useEffect(() => {
    // console.log(userData);
    return () => {};
  }, [userData]);
  //Fetching for both data every refresh
  const [favoriteData, setFavoriteData] = useState<
    FavoriteContent["favoriteData"]
  >({
    favoriteList: [""],
  });
  if (loginStatusData.isLoggedIn === null || userData.isReady === false) {
    return <LoadingCube></LoadingCube>;
  } else {
    return (
      <Router>
        <div className="App">
          <Switch>
            <LoginStatusContext.Provider
              value={{ loginStatusData, setLoginStatusData }}
            >
              <FavoriteContext.Provider
                value={{ favoriteData, setFavoriteData }}
              >
                <FollowContext.Provider value={{ followData, setFollowData }}>
                  <UserContext.Provider value={{ userData, setUserData }}>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    {/* <Route path="/p/:postId" component={SinglePostPage} /> */}
                    <AuthenticatedRoute
                      path="/p/:postId"
                      Component={SinglePostPage}
                    />
                    {/* <Route path="/user/:userId" component={UserDetail} exact /> */}

                    {/* <Route path="/message" component={Message} exact /> */}
                    {/* <Route path="/socket/:uid" component={Socket} /> */}
                    <AuthenticatedRoute
                      path="/user/:userId"
                      Component={UserDetail}
                    />
                    <AuthenticatedRoute
                      path="/search/:searchContent"
                      Component={Search}
                      renderFunc={() => <Search key={Date.now()}></Search>}
                    />
                    <AuthenticatedRoute
                      path="/profile/edit"
                      Component={EditProfile}
                    ></AuthenticatedRoute>
                    <AuthenticatedRoute path="/" Component={Feeds} />
                  </UserContext.Provider>
                </FollowContext.Provider>
              </FavoriteContext.Provider>
            </LoginStatusContext.Provider>
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
}

export default App;
