import axios from "axios";
import {BASE_URL} from "../baseURL";

export async function getSearchResults(token: string,  query: string) {
    console.log(query);
    const request = await axios({
        method: 'GET',
        url: BASE_URL + '/search/' + query,
        headers: {
            authorization: token
        }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
    
    return request;
}
