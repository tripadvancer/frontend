import { SettingsCategories, SocialApps, UserPrivacySettings } from '@/utils/enums'

export type IUser = {
    id: number
    name: string
    info: string
    avatar: string | null
    settings: IUserSettings
    social: IUserSocial
    createdAt: Date
    updatedAt: Date
    _count: IUserStatistics
    visitedCountries: IUserVisitedCountry[]
}

export type IUserSettings = {
    [SettingsCategories.PRIVACY]: Record<UserPrivacySettings, boolean>
}

export type IUserSocial = Record<SocialApps, string>

export type IUserStatistics = {
    places: number
    placePhotos: number
    placeReviews: number
    visitedPlaces: number
    visitedCountries: number
}

export type IUserVisitedCountry = {
    code: string
    count: number
}

export type IUserInfo = Pick<IUser, 'id' | 'name' | 'info' | 'avatar'>

export type UpdateUserInfoInputs = Pick<IUser, 'name' | 'info' | 'settings' | 'social'>

export type ChangeUserPasswordInputs = {
    oldPassword: string
    newPassword: string
}

export type ChangeUserEmailInputs = {
    newEmail: string
    password: string
}

export type UpdateUserInfoResponse = {
    status: 'OK' | 'USERNAME_ALREADY_EXISTS_ERROR'
}

export type ChangeUserPasswordResponse = {
    status: 'OK' | 'WRONG_CREDENTIALS_ERROR' | 'PASSWORD_POLICY_VIOLATED_ERROR'
}

export type ChangeUserEmailResponse = {
    status: 'OK' | 'WRONG_CREDENTIALS_ERROR' | 'EMAIL_ALREADY_EXISTS_ERROR'
}

export type RestoreUserResponse = {
    status: 'OK' | 'INVALID_TOKEN_ERROR'
}

export type ConfirmUserDeletionResponse = {
    status: 'OK' | 'INVALID_TOKEN_ERROR'
}
