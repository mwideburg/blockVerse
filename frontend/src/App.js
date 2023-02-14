import React from "react";
import "./styles.css";
import {connect} from 'react-redux';
import LoginComponent from './components/login/login_component';
import RotateBox from './components/rotateBox/rotateBox'
import MyBox from './components/normalBox/normalBox'


const mSTP = state => {
  return ({
    loggedIn: state.session.isAuthenticated,
    username: state.session.username,
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
    return (
    <div className="App">
        <div>
            <MyBox />
        </div>
    
    </div>
  );
  }
}
export default connect(mSTP, mDTP)(App)



