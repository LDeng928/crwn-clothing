// Initialize a state
const INITIAL_STATE = {
    currentUser: null
}

// Pass in a default value
const userReducer = (state = INITIAL_STATE, action) => {
    // Use switch statement
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;