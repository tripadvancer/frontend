import { SettingsCategories, UserPrivacySettings, UserSocialApps } from '@/utils/enums'

export type IUser = {
    id: number
    name: string
    info: string
    avatar: string | null
    social: IUserSocial
    createdAt: Date
    updatedAt: Date
    _count: IUserStatistics
}

export type IUserSocial = Partial<Record<UserSocialApps, string>>

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
}[]

export type IUserSettings = IUserPrivacySettings

export type IUserPrivacySettings = {
    [SettingsCategories.PRIVACY]?: Partial<Record<UserPrivacySettings, boolean>>
}

export type IUserInfo = Pick<IUser, 'id' | 'name' | 'avatar'>

export type UpdateUserDataInputs = Pick<IUser, 'name' | 'info' | 'social'> & {
    settings: IUserPrivacySettings
}

export type ChangeUserPasswordInputs = {
    oldPassword: string
    newPassword: string
}

export type ChangeUserEmailInputs = {
    newEmail: string
    password: string
}

export type UpdateUserDataResponse = {
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
