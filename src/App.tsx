import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { Test } from "./Test";
import { Signup } from "./pages/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
