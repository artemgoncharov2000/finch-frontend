export interface ContentItem {
    type: string,
    value: string
}
export interface Card{
    content: ContentItem[],
    guideId: string,
    location: string,
    thumbnailUrl: string,
    title: string,
    type?: string
}