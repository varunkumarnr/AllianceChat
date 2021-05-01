import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
export const Routes = () => {
  return (
    <Router>
      {/* public routes i.e no login required */}
      <Route exact path='/' component={Login}></Route>
      <Route path='/signup' component={Signup}></Route>
      <Switch></Switch>
    </Router>
  );
};
