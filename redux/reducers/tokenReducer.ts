import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from "../actions/actionTypes"

const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null
}

const tokenReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case RESTORE_TOKEN:
            console.log('payload we are here', action.payload);
            return {
                ...state,
                isLoading: false,
                userToken: action.payload
            }
        case SIGN_IN:
            return {
                ...state,
                isLoading: false,
                isSignout: false,
                userToken: action.payload
            }  
        case SIGN_OUT:
            return {
                ...state,
                isLoading: false,
                isSignout: true,
                userToken: null
            }
        default:
            return state
    }
}

export default tokenReducer;