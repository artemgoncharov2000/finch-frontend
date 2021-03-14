import { SET_GUIDE_ID, SET_GUIDE, GET_GUIDE, GET_GUIDE_ID } from '../actions/actionTypes'

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

const guideReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_GUIDE_ID:
            return {
                ...state,
                id: { id: action.guideId }
            }
        case SET_GUIDE:
            //console.log('reducer', action.data)
            return {
                guide: {
                    description: action.data.description,
                    id: {
                        id: ''
                    },
                    location: action.data.location,
                    thumbnailUrl: action.data.thumbnailUrl,
                    title: action.data.title,
                    travelDate: action.data.travelData
                }
                

            };
        case GET_GUIDE_ID:
            return state.id.id;
        case GET_GUIDE:
            return state.guide;

        default:
            console.log('defautl', state)
            return state;    
    }
}

export default guideReducer;