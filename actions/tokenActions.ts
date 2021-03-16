import { SET_TOKEN, GET_TOKEN } from "./actionTypes"

export const setToken = (token: string) => (
    {
        type: SET_TOKEN,
        payload: token
    }
)

export const getToken = () => {
    {
        type: GET_TOKEN
    }
}