import { SET_GUIDE_ID, SET_GUIDE} from '../actions/actionTypes'
import Guide from '../interfaces/Guide';

interface Action{
    type: string,
    payload: Guide | string
}

const initialState = {
    guide: {
        description: '',
        id: {
            id: ''
        },
        location: '',
        thumbnailUrl: '',
        title: '',
        travelDate: ''
    }
}

const guideReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_GUIDE_ID:
            return {
                ...state,
                guide: {
                    ...state.guide,
                    id: { id: action.payload }
                }
            }
        case SET_GUIDE:
            return {
                guide: {
                    description: action.payload.description,
                    id: action.payload.id,
                    location: action.payload.location,
                    thumbnailUrl: action.payload.thumbnailUrl,
                    title: action.payload.title,
                    travelDate: action.payload.travelData
                }
            };
        default:
            return state;    
    }
}

export default guideReducer;