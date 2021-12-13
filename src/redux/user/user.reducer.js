import UserActionTypes from './user.types';

// Initialize a state
const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

// Pass in a default value
const userReducer = (state = INITIAL_STATE, action) => {
  // Use switch statement
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
