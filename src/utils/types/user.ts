import { UserPrivacySettings, UserSocialApps } from '@/utils/enums'

export type IUser = {
    id: number
    name: string
    info: string
    avatar: string | null
    social: Partial<Record<UserSocialApps, string>>
    createdAt: Date
    updatedAt: Date
    publicSettings: Partial<Record<UserPrivacySettings, boolean>>
    _count: IUserStatistics
}

export type IUserStatistics = {
    places: number
    placePhotos: number
    placeReviews: number
    visitedPlaces: number
    visitedCountries: number
}

export type IUserVisitedCountries = {
    code: string
    count: number
    places: any
}[]
