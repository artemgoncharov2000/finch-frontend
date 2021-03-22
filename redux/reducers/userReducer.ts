import { SET_USER, SET_USER_DESCRIPTION, SET_USER_EMAIL, SET_USER_PHONE, SET_USER_PROFILE_ACCESS, SET_USER_PROFILE_URL, SET_USER_SUBSCRIBERS_COUNT, SET_USER_SUBSCRIPTIONS_COUNT, SET_USER_TITLE, SET_USER_TYPE } from "../actions/actionTypes";
import User from '../../interfaces/User'

interface Action {
    type: string,
    payload: User | string | number
}

const initialState = {
    user: {
        description: "",
        email: "",
        phone: "",
        profileAccess: "",
        profilePhotoUrl: "",
        subscribersCount: 0,
        subscriptionsCount: 0,
        title: "",
        type: "",
        username: ""
    }
};

const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_USER:
            console.log('payload', action.payload)
            return {
                user: action.payload
            }
        case SET_USER_DESCRIPTION: 
            console.log(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    description: action.payload
                }
                
            }    
        case SET_USER_EMAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload
                }
            }
        case SET_USER_PHONE:
            return {
                ...state,
                user: {
                    ...state.user,
                    phone: action.payload
                }
            }    
        case SET_USER_PROFILE_ACCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    profileAccess: action.payload
                }
            }    
        case SET_USER_PROFILE_URL:
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePhotoUrl: action.payload
                }
            } 
        case SET_USER_SUBSCRIBERS_COUNT:
            return {
                ...state,
                user: {
                    ...state.user,
                    subscribersCount: action.payload
                }
            }      
        case SET_USER_SUBSCRIPTIONS_COUNT:
            return {
                ...state,
                user: {
                    ...state.user,
                    subscriptionsCount: action.payload
                }
            }     
        case SET_USER_TITLE:
            return {
                ...state,
                user: {
                    ...state.user,
                    title: action.payload
                }
            }    
        case SET_USER_TYPE:
            return {
                ...state,
                user: {
                    ...state.user,
                    type: action.payload
                }
            }    
        default:
            return state;
    }
}

export default userReducer;