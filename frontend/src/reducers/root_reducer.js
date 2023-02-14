
import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './error_reducer';
import user from './user_reducer';
const RootReducer = combineReducers({
    user,
    session,
    errors
});

export default RootReducer;