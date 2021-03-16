import axios from "axios";
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