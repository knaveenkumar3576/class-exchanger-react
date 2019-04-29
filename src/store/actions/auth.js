import * as actionTypes from '../actionTypes'
import axiosHandler from '../../HOC/axios-course'

export const setIsAuthenticatedFlag=(isAuthenticated)=> {
    return {
        type: actionTypes.SET_IS_AUTHENTICATED_FLAG,
        isAuthenticated: isAuthenticated,        
    }
}


export const setLoggedInUser=(user)=> {
    return {
        type: actionTypes.SET_LOGGED_IN_USER,
        user: user,        
    }
}