import axios from 'axios';
import {BASE_URL} from '../baseURL'

interface User{
    email?: string,
    password: string,
    username: string
}
export async function SignUpUser(user: User){
    const request = await axios({
        method: 'POST',
        url: BASE_URL + "/auth/register",
        data: {
            email: user.email,
            password: user.password,
            username: user.username
        }
    })
    .then(response => response.data)
    .catch(error => {
        const errorJSON = error.toJSON();
        if (errorJSON.message === "Request failed with status code 409"){
            alert('This account is already registered!');
        } else {
            console.log(error);
        }
    })
    return request;
}

export async function SignInUser(user: User){
    
    const request = await axios({
        method: 'POST',
        url: BASE_URL + "/auth/login",
        data: {
            username: user.username,
            password: user.password
        }
    })
    .then(response => {
        let headers = response.headers;
        return headers['authorization'];
    })
    .catch(error => console.log(error));

    return request;
}