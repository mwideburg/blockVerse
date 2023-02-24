


import {register, login, logout} from '../utils/session_api_util'

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";


export const receiveCurrentUser = userData => {
    return ({
    type: LOGIN,
    userData
})};

export const receiveUserData = userData => {
    console.log("USER DATA", userData)

    return ({
    type: RECEIVE_USER_DATA,
    userData
})};

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logOutUserResponse = (message) => ({
  type: LOGOUT,
  message
})


export const registerUser = user => dispatch => {
    return (register(user).then(res => {
        // debugger
        console.log("RES :::::::::", res.data)
        dispatch(receiveCurrentUser(res.data))
    })
        .catch(err => {
            
            dispatch(receiveErrors(err.response.data));
        }))
}
export const loginUser = user => dispatch => {
    return (login(user).then(res => {
        // debugger
        console.log("RES :::::::::", res.data)
        dispatch(receiveCurrentUser(res.data))
    })
        .catch(err => {
            
            dispatch(receiveErrors(err.response.data));
        }))
}

export const getUser = user => dispatch => {
    return (getUser(user).then(res => {
        // debugger
        console.log("RES :::::::::", res.data)
        dispatch(receiveCurrentUser(res.data))
    })
        .catch(err => {
            
            dispatch(receiveErrors(err.response.data));
        }))
}

export const logOutUser = (user) => dispatch => {
     return (logout(user).then(res => {
        // debugger
        dispatch(logOutUserResponse(res.data))
    })
        .catch(err => {
            console.log("ERROR", err)
            dispatch(receiveErrors(err));
        }))
};
