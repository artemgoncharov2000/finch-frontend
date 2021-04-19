import Guide from '../../interfaces/Guide';
import {SET_GUIDE_ID, SET_GUIDE} from './actionTypes';

export const setGuideId = (guideId: string) => (
    {
        type: SET_GUIDE_ID,
        payload: guideId
    }
)

export const setGuide = (guide: Guide) => (
    {
        type: SET_GUIDE,
        payload: guide
    }
)


