import axios from 'axios';
import {BASE_URL} from '../baseURL';

export async function getProfileData(token: string){
    const request = await axios({
        method: 'get',
        url: BASE_URL + "/users/me",
        headers: {
            authorization: token
        }
    })
    .then(response => response)
    .catch(error => console.error(error));
    return request;
}