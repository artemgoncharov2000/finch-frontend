import Card from '../interfaces/Card'
import {GET_CARD, SET_CARD} from './actionTypes'

export const setCard = (card: Card) => (
    {
        type: SET_CARD,
        data: card
    }
)

export const getCard = () => (
    {
        type: GET_CARD,
    }
)
