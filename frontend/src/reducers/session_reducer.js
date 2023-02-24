
import { LOGIN, LOGOUT, RECEIVE_USER_DATA } from '../actions/session_actions';

let initialState = {
isAuthenticated: false,
accessToken:'',
username: '',
userData: {},
errors: '',
};
const user = JSON.parse(localStorage.getItem('user'));
if(user){
    initialState = {
        isAuthenticated: true,
        accessToken: user.accessToken,
        username: user.accessToken,
        userData: user,
        errors:''
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
    case LOGIN:
        localStorage.setItem('user', JSON.stringify(action.userData));
        console.log("SET LOCAL STORAGE")
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("LOCAL STIRAGE", user)
        return Object.assign({}, state, {isAuthenticated: true, userData: action.userData})
    case RECEIVE_USER_DATA:
        return Object.assign({}, state, {isAuthenticated: true, userData: action.userData})
    
        case LOGOUT:
            localStorage.removeItem('user');
        return Object.assign({}, {isAuthenticated: false,
                accessToken:'',
                username: '',
                userData: {},
                errors: '',
                })

    default:
        return state;
    }
}