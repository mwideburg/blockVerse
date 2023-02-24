import React from "react";
import { useEffect, useState } from 'react';
import "./styles.css";
import {connect} from 'react-redux';
import LoginForm from "./components/login/login_test"
import RotateBox from './components/rotateBox/rotateBox'
import {receiveCurrentUser, receiveUserData, getUser} from "./actions/session_actions"
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
    getUserInfo: (user) => dispatch(getUser(user))
//   logout: () => dispatch(logout())
    })
}
const App = () => {

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            console.log("user", user)
        getUser(user);
        }
    }, []);
    // constructor(props){
    //     super(props);
    // }


    // if (!this.props.loggedIn) return (
    //     <div className="App">
    //     <div>
    //     <LoginForm />
    //     </div>
    //     <div>
    //         <RotateBox />
    //     </div>
    //     </div>
    // )
    // const userId = this.props.userData.id
    // const profileUrl = `/users/${userId}`
    // console.log("USER DATA", userId)
    return (
        <BrowserRouter>
          
                <AuthRoute path="/" component={LoginForm}></AuthRoute>
           <Switch>
                 <ProtectedRoute path="/profile" component={ProfileComponent}></ProtectedRoute>
          </Switch>
       </BrowserRouter>
  );

}
export default connect(mSTP, mDTP)(App)



