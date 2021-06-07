import React from "react";
import "./App.css";
import { Login } from "pages/Login";
import { Signup } from "pages/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Feeds } from "pages/Home/Feeds";
import { Message } from "pages/Message/Message";
import { SinglePostPage } from "pages/SinglePost/SinglePostPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" exact component={Feeds}></Route>
          <Route path="/message" exact component={Message} />
          <Route path="/p" exact component={SinglePostPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
