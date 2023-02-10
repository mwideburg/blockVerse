


import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';


export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_FEATURES = "RECEIVE_FEATURES";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";


export const receiveCurrentUser = accessToken => {
    return ({
    type: LOGIN,
    accessToken
})};

export const receiveUserData = userData => {
    return ({
    type: RECEIVE_USER_DATA,
    userData
})};

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = (message) => ({
  type: LOGOUT,
  message
})


export const login = user => dispatch => {
    
    return (APIUtil.login(user).then(res => {
        // debugger
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
        .catch(err => {
            
            dispatch(receiveErrors(err.response.data));
        }))
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('robot')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};
