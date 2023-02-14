
import { combineReducers } from 'redux';

import SessionErrorReducer from './session_error_reducer';

export default combineReducers({
    session: SessionErrorReducer
});