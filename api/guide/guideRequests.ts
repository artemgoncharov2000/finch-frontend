import axios from "axios";
import Guide from "../../interfaces/Guide";
import {BASE_URL} from "../baseURL";

export async function getGuidesByUser(token: string, username: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + '/guides/u/' + username,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    
    return request;
}

export async function createGuide(token: string) {
    const request = await axios({
        method: 'POST',
        url: BASE_URL + '/guides',
        headers: {
            authorization: token
        },
        data: {}
    })
    .then(response => response.data)
    .catch(error => console.error(error));

    return request;
}

export async function updateGuide(token: string, guideId: string, guide: Guide) {
    const request = await axios({
        method: 'PUT',
        url: BASE_URL + "/guides",
        headers: {
            authorization: token
        },
        data: {
            id: guideId,
            description: guide.description,
            location: guide.location,
            thumbnailUrl: guide.thumbnailUrl,
            title: guide.title,
            travelData: guide.travelDate
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));

    return request;
}