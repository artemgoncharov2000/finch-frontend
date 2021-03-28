import axios from "axios";
import {Card} from "../../interfaces/Card";
import {BASE_URL} from "../baseURL";

export async function getCardsByGuideId(token: string, guideId: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + '/cards/g/' + guideId,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));

    return request;
}

export async function getCardById(token: string, id: string) {
    const request = axios({
        method: 'GET',
        url: BASE_URL + '/cards/' + id,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));

    return request;
}


export async function createCard(token: string, guideId: string, card: Card){
    console.log(card);
    const request = await axios({
        method: 'POST',
        url: BASE_URL + "/cards",
        headers: {
            authorization: token
        },
        data: {
            content: card.content,
            guideId: guideId,
            location: card.location,
            thumbnailUrl: card.thumbnailUrl,
            title: card.title
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    return request;
}