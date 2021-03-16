import {SET_CARD, GET_CARD} from '../actions/actionTypes'


const initialState = {
    card: {
        content: [],
        guideId: {
            id: ''
        },
        location: '',
        tags: [],
        thumbnailUrl: '',
        title: ''
    }
}

const cardReducer = (state = initialState, action: any) => {
    switch  (action.type) {
        case SET_CARD:
            return {
                card: {
                    content: action.data.content,
                    guideId: action.data.guideId,
                    location: action.data.location,
                    tags: action.data.tags,
                    thumbnailUrl: action.data.thumbnailUrl,
                    title: action.data.title
                }
            }
        case GET_CARD:    
            return state;
        default:
            return state;    
    }
}

export default cardReducer;