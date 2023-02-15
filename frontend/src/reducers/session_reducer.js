
import { LOGIN, LOGOUT, RECEIVE_USER_DATA } from '../actions/session_actions';

const initialState = {
isAuthenticated: false,
accessToken:'',
username: '',
userDate: {},
errors: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
    case LOGIN:
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