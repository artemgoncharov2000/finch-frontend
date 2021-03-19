import axios from "axios";
import Card from "../../interfaces/Card";
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

export async function createCard(token: string, card: Card){
    const request = await axios({
        method: 'POST',
        url: BASE_URL + "/cards",
        headers: {
            authorization: token
        },
        data: {
            content: JSON.stringify(card.content),
            guideId: card.guideId.id,
            location: card.location,
            tags: card.tags,
            thumbnailUrl: card.thumbnailUrl,
            title: card.title
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    return request;
}