import {SET_GUIDE_ID, SET_GUIDE, GET_GUIDE_ID, GET_GUIDE} from './actionTypes';

export const setGuideId = (guideId: string) => (
    {
        type: SET_GUIDE_ID,
        data: guideId
    }
)

export const setGuide = (guide: object) => (
    {
        type: SET_GUIDE,
        data: guide
    }
)

export const getGuide = () => (
    {
        type: GET_GUIDE
    }
);

export const getGuideId = () => {
    {
        type: GET_GUIDE_ID
    }
}

