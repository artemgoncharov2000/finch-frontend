import axios from "axios";
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