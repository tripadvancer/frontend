export type GetPlacesAroundParams = {
    lat: number
    lng: number
    radius: number
    categories: number[]
    limit?: number
}

export type GetRandomPlaceResponse = {
    id: number
    title: string
    description: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isSaved: boolean
    coordinates: number[]
}

export type GetPlacesAroundResponse = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    distance: number
}[]
