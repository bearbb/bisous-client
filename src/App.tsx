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

function App() {
  //first call an api to check if user have logged in or not, if not then navigate to login page
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setIsLoggedIn(false);
    return () => {};
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" exact component={Feeds}></Route>
          <Route path="/message" exact component={Message} />
          <Route path="/p/:postId" exact component={SinglePostPage} />
          <Route path="/user" exact component={UserDetail} />
          <Route path="/loading" exact component={LoadingScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
