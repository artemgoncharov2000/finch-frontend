export default interface Guide {
    authorUsername: string,
    created: string,
    description: string,
    favourite: boolean
    id: string,
    liked: boolean,
    likesnum: number,
    location: string,
    tags: string[],
    thumbnailUrl: string,
    title: string,
    travelDate: string,
    type: string,
}