import React from "react";
import "./styles.css";
import {connect} from 'react-redux';
import LoginComponent from './components/login/login_container';
import RotateBox from './components/rotateBox/rotateBox'
// import MyBox from './components/normalBox/normalBox'
import ProfileComponent from "./components/profile/profile_container";
import { BrowserRouter ,Switch, Route, Link } from 'react-router-dom';

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

//   logout: () => dispatch(logout())
    })
}
class App extends React.Component {

    // constructor(props){
    //     super(props);
    // }

  render(){
    if (!this.props.loggedIn) return (
        <div className="App">
        <div>
        <LoginComponent />
        </div>
        <div>
            <RotateBox />
        </div>
        </div>
    )
    const userId = this.props.userData.id
    const profileUrl = `/users/${userId}`
    return (
        <BrowserRouter>
          
           <Switch>
                 <Route path={profileUrl} component={ProfileComponent}></Route>
          </Switch>
       </BrowserRouter>
  );
  }
}
export default connect(mSTP, mDTP)(App)



