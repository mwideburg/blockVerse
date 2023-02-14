
import { LOGIN, LOGOUT, RECEIVE_USER_DATA } from '../actions/session_actions';

const initialState = {
isAuthenticated: false,
accessToken: {},
username: '',
userDate: {},
errors: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
    case LOGIN:
        console.log("ACTION", action)
        return Object.assign({}, state, {isAuthenticated: true, userData: action.userData})
    case RECEIVE_USER_DATA:
        return Object.assign({}, state, action.userData)
    
        case LOGOUT:
        initialState.errors = action.message;
        return initialState;

    default:
        return state;
    }
}