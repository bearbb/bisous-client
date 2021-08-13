import { useState, useEffect } from "react";
import "./App.css";
import { Login } from "pages/Login";
import { Signup } from "pages/Signup";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Feeds } from "pages/Home/Feeds";
import { SinglePostPage } from "pages/SinglePost/SinglePostPage";
import { UserDetail } from "pages/UserDetail/UserDetail";
import { Message } from "pages/Message/Message";
import { AuthenticatedRoute } from "pages/AuthenticatedRoute";
import { UserContext, UserContent } from "Contexts/UserContext";
import { FollowContext, FollowContent } from "Contexts/FollowContext";
import { FavoriteContent, FavoriteContext } from "Contexts/FavoriteContext";
import {
  LoginStatusContext,
  LoginStatusContent,
} from "Contexts/LoginStatusContenxt";
//socket context
import {
  SocketContext,
  useSocketContext,
  socket,
} from "Contexts/SocketContext";

import Search from "pages/Search/Search";
import { getFavoriteList } from "Utility/favorites";
import { getOwnerFollowData } from "Utility/follow";
import { getLogInStatus, getOwnerData } from "Utility/user";
import { EditProfile } from "pages/EditProfilePage/EditProfile";
import { LoadingCube } from "pages/LoadingScreen/LoadingCube";

function App() {
  const [socketRoomJoined, setSocketRoomJoined] = useState<boolean>(false);
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
    getAllOwnerData();
  }, []);

  //joined handle
  const socketRoomJoinedSuccess = () => {
    console.log(
      `%cSocket connect n join room successfully`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    setSocketRoomJoined(true);
  };

  //Connect to socket
  useEffect(() => {
    //check if joined
    if (!socketRoomJoined && userData.userId) {
      console.log(
        `%cConnecting to socket`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
      socket.connect();
    }
    socket.on("connect", () => {
      console.log(
        `%c${userData.userId}`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
      socket.emit("authenticateFromClient", { uid: userData.userId });
    });
    //listen on joined
    socket.on("roomJoined", socketRoomJoinedSuccess);
    //listen on receive message
    return () => {
      socket.off("roomJoined", socketRoomJoinedSuccess);
    };
  }, [userData.userId]);
  // useEffect(() => {
  //   console.log("follow data ------");
  //   console.log(followData);
  //   return () => {};
  // }, [followData]);
  //TODO: Fetching for both data every refresh
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
              <SocketContext.Provider value={socket}>
                <FavoriteContext.Provider
                  value={{ favoriteData, setFavoriteData }}
                >
                  <FollowContext.Provider value={{ followData, setFollowData }}>
                    <UserContext.Provider value={{ userData, setUserData }}>
                      <Route path="/login" exact component={Login} />
                      <Route path="/signup" exact component={Signup} />
                      <AuthenticatedRoute
                        path="/p/:postId"
                        Component={SinglePostPage}
                        isExact={true}
                      />
                      <AuthenticatedRoute
                        isExact={true}
                        path="/user/:userId"
                        Component={UserDetail}
                      />
                      <AuthenticatedRoute
                        isExact={true}
                        path="/search/:searchContent"
                        Component={Search}
                        renderFunc={() => <Search key={Date.now()}></Search>}
                      />
                      <AuthenticatedRoute
                        isExact={true}
                        path="/profile/edit"
                        Component={EditProfile}
                      ></AuthenticatedRoute>
                      <AuthenticatedRoute
                        isExact={false}
                        path="/direct"
                        Component={Message}
                      ></AuthenticatedRoute>
                      <AuthenticatedRoute
                        isExact={true}
                        path="/"
                        Component={Feeds}
                      />
                    </UserContext.Provider>
                  </FollowContext.Provider>
                </FavoriteContext.Provider>
              </SocketContext.Provider>
            </LoginStatusContext.Provider>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
