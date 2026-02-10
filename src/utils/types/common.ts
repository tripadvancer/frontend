export type PaginatedResponse<T> = {
    total: number
    items: T[]
}

export type FormFieldError = {
    id: string
    error: string
}

export type AuthContext = {
    activeUserId: number | undefined
    isAuth: boolean
    isEmailVerified: boolean | undefined
}

export type IReview = {
    id: number
    place: {
        id: number
        title: string
        countryCode: string | null
    }
    user: {
        id: number
        name: string
        avatar: string | null
    }
    text: string
    rating: number
    photos: { id: number; url: string }[]
    createdAt: Date
    updatedAt: Date
}

export type IList = {
    id: number
    name: string
    description: string | null
    isPublic: boolean
    listToPlace: {
        placeId: number
    }[]
    _count: {
        listToPlace: number
    }
}
