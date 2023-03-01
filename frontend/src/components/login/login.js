import { useState } from 'react';
import {Link, Routes, Route, Redirect} from 'react-router-dom';
import Button from '@mui/material/Button';
import {registerUser, loginUser} from "../../actions/session_actions"
import RotateBox from '../rotateBox/rotateBox'
import { connect } from 'react-redux';
const LoginForm = ( { isAuthenticated, loginUser, userId, userData } ) => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {userName, password, firstName: "test firstName",
            lastName: "test lastName",}
        console.log(user)
        loginUser(user);

    };

    if (redirectToProfile) {
        return <Redirect to={"/profile"} />;
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">Log In</button>
        </form>

        <RotateBox />
        </div>
    );
};


const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
  userData: state.session.userData
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);