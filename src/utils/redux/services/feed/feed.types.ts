export type GetFeedParams = {
    cursor?: number
    countryCodes: string[]
}

export type IFeedItem = {
    id: number
    title: string
    description: string
    countryCode: string | null
    createdAt: string
    author: {
        id: number
        name: string
        avatar: string | null
    }
    photos: {
        id: number
        url: string
    }[]
    reviews: {
        id: number
        text: string
        rating: number
        createdAt: string
        author: {
            id: number
            name: string
            avatar: string | null
        }
    }[]
}

export type GetFeedResponse = {
    items: IFeedItem[]
    nextCursor: number | null
}
