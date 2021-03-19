export interface ContentItem {
    type: string,
    value: string
}
export interface Card{
    content: ContentItem[],
    guideId: {id: string},
    location: string,
    tags: string[],
    thumbnailUrl: string,
    title: string
}