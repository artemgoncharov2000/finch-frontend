import axios from 'axios';
import {BASE_URL} from '../baseURL';

export async function getFavorites(token: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + '/guides/favourites',
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    
    return request;
}