import * as actionTypes from '../actionTypes';

const initialState = {
    isAuthenticated:false,
    user: "nkrish20@asu.edu"
};  

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.SET_IS_AUTHENTICATED_FLAG:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
            };
        case actionTypes.SET_LOGGED_IN_USER:
            return {
                ...state,
                user: action.user,
            };
                
        default:
            return state;
    }
}

export default reducer;
