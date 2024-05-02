export type IUser = {
    id: number
    name: string
    info: string
    avatar: string | null
    socialLinks: IUserSocialLinks
    createdAt: Date
    updatedAt: Date
    _count: IUserStatistics
}

export type IUserSocialLinks = {
    facebookUrl: string
    instagramUrl: string
    youtubeUrl: string
    twitterUrl: string
    websiteUrl: string
}

export type IUserStatistics = {
    places: number
    placePhotos: number
    placeReviews: number
    visitedPlaces: number
    visitedCountries: number
}

export type IUserInfo = Pick<IUser, 'id' | 'name' | 'info' | 'avatar' | 'socialLinks'>

export type UpdateUserInfoInputs = Pick<IUser, 'name' | 'info' | 'socialLinks'>

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
