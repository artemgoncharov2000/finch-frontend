import {SET_USER, SET_USER_DESCRIPTION, SET_USER_EMAIL, SET_USER_PHONE
, SET_USER_PROFILE_ACCESS, SET_USER_PROFILE_URL, SET_USER_SUBSCRIBERS_COUNT,
SET_USER_SUBSCRIPTIONS_COUNT, SET_USER_TITLE, SET_USER_TYPE} from './actionTypes';
import User from '../interfaces/User'

export const setUser = (user: User) => (
    {
        type: SET_USER,
        payload: user
    }
)
export const setUserDescription = (value: string) => (
    {
        type: SET_USER_DESCRIPTION,
        payload: value
    }
)
export const setUserEmail = (value: string) => (
    {
        type: SET_USER_EMAIL,
        payload: value
    }
)

export const setUserPhone = (value: string) => (
    {
        type: SET_USER_PHONE,
        payload: value
    }
)

export const setUserProfileAccess = (value: string) => (
    {
        type: SET_USER_PROFILE_ACCESS,
        payload: value
    }
)

export const setUserProfileUrl = (value: string) => (
    {
        type: SET_USER_PROFILE_URL,
        payload: value
    }
)

export const setUserSubscribersCount = (value: number) => (
    {
        type: SET_USER_SUBSCRIBERS_COUNT,
        payload: value
    }
)

export const setUserSubscriptionsCount = (value: number) => (
    {
        type: SET_USER_SUBSCRIPTIONS_COUNT,
        payload: value
    }
)

export const setUserTitle = (value: string) => (
    {
        type: SET_USER_TITLE,
        payload: value
    }
)

export const setUserType = (value: string) => (
    {
        type: SET_USER_TYPE,
        payload: value
    }
)