import {BASE_URL} from '../baseURL';
import axios from 'axios';

export async function uploadImage(token: string, uri: string) {
    const formData = new FormData();
    formData.append('file', {
        // @ts-ignore
        uri: Platform.OS === "android" ? uri : uri.replace('file://', ''),
        type: 'image/jpg',
        name: 'imagename.jpg'
    });
    const request = await axios({
        method: 'POST',
            url: BASE_URL + '/i/upload',
            headers: {
                authorization: token,
                'Content-type': 'multipart/form-data'
            },
            data: formData
    })
    .then(response => response.data)
    .catch(error => console.error(error));

    return request;
}

