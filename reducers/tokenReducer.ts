import { SET_TOKEN, GET_TOKEN} from "../actions/actionTypes"

const initialState = {
    token: ''
}

const tokenReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TOKEN:
            console.log('payload', action.payload);
            return {
                ...state,
                token: action.payload
            }
        case GET_TOKEN:
            return state.token   
        default:
            return state
    }
}

export default tokenReducer;