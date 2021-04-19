import axios from 'axios';
import {BASE_URL} from '../baseURL';

export async function getProfileData(token: string, username: string){
    const request = await axios({
        method: 'GET',
        url: BASE_URL + "/users/" + username,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    return request;
}

export async function getUserByUsername(token: string, username: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + "/users/preview/" + username,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    return request;
}
export async function getUserSubscribers(token: string, username: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + "/users/subs/subscribers/" + username,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.log(error));
    return request;
}

export async function getUserSubscriptions(token: string, username: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + '/users/subs/subscriptions/' + username,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    return request;
}

export async function followUser(token: string, username: string) {
    const request = await axios({
        method: 'POST',
        url: BASE_URL + '/users/subs/' + username,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error))
    console.log('Follow user: ' + username);
    return request;
}

export async function unfollowUser(token: string, username: string) {
    const request = await axios({
        method: 'DELETE',
        url: BASE_URL + '/users/subs/' + username,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error))
    console.log('Unfollow user: ' + username);
    return request;
}