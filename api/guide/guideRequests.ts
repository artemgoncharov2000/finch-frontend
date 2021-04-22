import axios from "axios";
import Guide from "../../interfaces/Guide";
import { BASE_URL } from "../baseURL";

export async function getListOfGuidesByUsername(token: string, username: string) {
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

export async function getGuideById(token: string, id: string) {
    const request = await axios({
        method: 'GET',
        url: BASE_URL + '/guides/' + id,
        headers: {
            authorization: token
        }
    })
        .then(response => response.data)
        .catch(error => console.error(error));

    return request;
}

export async function createGuide(token: string, guide: Guide) {
    console.log('guideData: ', guide)
    const request = await axios({
        method: 'POST',
        url: BASE_URL + '/guides',
        headers: {
            authorization: token
        },
        data: {
            description: guide.description,
            location: guide.location,
            thumbnailUrl: guide.thumbnailUrl,
            title: guide.title,
            travelData: guide.travelDate,
            tags: guide.tags
        }
    })
        .then(response => response.data.id)
        .catch(error => console.error(error));
    console.log('Guide was created');
    return request;
}

export async function updateGuide(token: string, guideId: string, guide: Guide) {
    console.log('travelDate:', guide.travelDate);
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
    console.log('Guide was updated');
    return request;
}

export async function likeGuide(token: string, guideId: string) {
    const request = await axios({
        method: 'POST',
        url: BASE_URL + '/guides/likes/' + guideId,
        headers: {
            authorization: token
        },
    })
        .then(response => response.status)
        .catch(error => console.error(error))
    console.log('Guide was liked');
    return request;
}

export async function dislikeGuide(token: string, guideId: string) {
    const request = await axios({
        method: 'DELETE',
        url: BASE_URL + '/guides/likes/' + guideId,
        headers: {
            authorization: token
        },
    })
        .then(response => response.status)
        .catch(error => console.error(error))
    console.log('Guide was disliked');
    return request;
}

export async function addGuideToFavorites(token: string, guideId: string) {
    const request = await axios({
        method: 'POST',
        url: BASE_URL + '/guides/favourites/' + guideId,
        headers: {
            authorization: token
        },
    })
        .then(response => response.status)
        .catch(error => console.error(error));
    console.log('Guide was added to favorites');
    return request;
}

export async function removeGuideFromFavorites(token: string, guideId: string) {
    const request = await axios({
        method: 'DELETE',
        url: BASE_URL + '/guides/favourites/' + guideId,
        headers: {
            authorization: token
        },
    })
        .then(response => response.status)
        .catch(error => console.error(error));
    console.log('Guide was removed from favorites');
    return request;
}

export async function sendReport(token: string, guideId: string, reason: string) {
    const request = await axios({
        method: 'POST',
        url: BASE_URL + '/report',
        headers: {
            authorization: token
        },
        data: {
            id: guideId,
            reason: reason
        }
    })
        .then(response => response.status)
        .catch(error => console.error(error))

    return request;
}