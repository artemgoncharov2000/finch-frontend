import {GET_USER} from './actionTypes'

export const getUser = (username: string) => {
    return {
        type: GET_USER,
        payload: username
    }
}