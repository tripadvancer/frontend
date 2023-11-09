export type IUser = {
    id: number
    name: string
    info: string
    avatar: string
    cover: string
    createdAt: Date
    updatedAt: Date
    _count: IUserStatistics
}

export type IUserStatistics = {
    places: number
    placePhotos: number
    placeReviews: number
    visitedPlaces: number
}

export type IUserInfo = Pick<IUser, 'id' | 'name' | 'info' | 'avatar'>
export type UpdateUserProfileInputs = Partial<Pick<IUser, 'name' | 'info'>>

export type UpdateUserPasswordInputs = {
    password: string
    current_password: string
}
