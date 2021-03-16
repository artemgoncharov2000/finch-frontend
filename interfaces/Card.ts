interface contentItem {
    type: string,
    value: string
}
export default interface Card{
    content: contentItem[],
    guideId: {id: string},
    location: string,
    tags: string[],
    thumbnailUrl: string,
    title: string
}