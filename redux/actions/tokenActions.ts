import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from "./actionTypes"

export const restoreToken = (token: string) => (
    {
        type: RESTORE_TOKEN,
        payload: token
    }
)

export const signIn = (token: string) => (
    {
        type: SIGN_IN,
        payload: token
    }
)

export const signOut = () => (
    {
        type: SIGN_OUT
    }
)