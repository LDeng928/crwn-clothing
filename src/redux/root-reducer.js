import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

// Need to import combineReducers
export default combineReducers({
    user: userReducer
});
