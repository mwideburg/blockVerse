import React from "react";
import { useEffect, useState } from 'react';
import "./styles.css";
import {connect} from 'react-redux';
import LoginForm from "./components/login/login"
import RotateBox from './components/rotateBox/rotateBox'
// import MyBox from './components/normalBox/normalBox'
import ProfileComponent from "./components/profile/profile_container";
import { BrowserRouter ,Switch, Route, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from "./utils/route_util";

const mSTP = state => {
  return ({
    loggedIn: state.session.isAuthenticated,
    username: state.session.username,
    userData: state.session.userData,
    errors: state.session.errors
  })
}

const mDTP = dispatch => {

  return ({
    })
}
const App = () => {
    return (
        <BrowserRouter>
          
                <AuthRoute path="/" component={LoginForm}></AuthRoute>
           <Switch>
                 <ProtectedRoute path="/profile" component={ProfileComponent}></ProtectedRoute>
          </Switch>
          <RotateBox />
       </BrowserRouter>
  );

}
export default connect(mSTP, mDTP)(App)



