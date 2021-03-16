import axios from 'axios';
import {BASE_URL} from '../baseURL';

export async function getProfileData(token: string){
    const request = await axios({
        method: 'GET',
        url: BASE_URL + "/users/me",
        headers: {
            authorization: token
        }
    })
    .then(response => response)
    .catch(error => console.error(error));
    return request;
}

export async function getUserSubscribers(token: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + "/user/subs/subscribers",
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.log(error));
    return request;
}

export async function getUserSubscriptions(token: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + '/users/subs/subscriptions',
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    return request;
}