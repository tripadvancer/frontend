import type { FormFieldError } from '@/utils/types/common'

export type IUser = {
    id: number
    name: string
    info: string
    avatar: string | null
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

export type UpdateUserInfoInputs = Partial<Pick<IUser, 'name' | 'info'>>

export type ChangeUserPasswordInputs = {
    oldPassword: string
    newPassword: string
}

export type ChangeUserEmailInputs = {
    newEmail: string
    password: string
}

export type UpdateUserInfoResponse =
    | {
          status: 'OK'
      }
    | {
          status: 'FIELD_ERROR'
          formFields: FormFieldError[]
      }

export type ChangeUserPasswordResponse =
    | {
          status: 'OK'
      }
    | {
          status: 'WRONG_CREDENTIALS_ERROR'
      }
    | {
          status: 'FIELD_ERROR'
          formFields: FormFieldError[]
      }

export type ChangeUserEmailResponse =
    | {
          status: 'OK'
      }
    | {
          status: 'WRONG_CREDENTIALS_ERROR'
      }
    | {
          status: 'FIELD_ERROR'
          formFields: FormFieldError[]
      }

export type RestoreUserResponse = {
    status: 'OK' | 'INVALID_TOKEN_ERROR'
}

export type ConfirmUserRemovalResponse = {
    status: 'OK' | 'INVALID_TOKEN_ERROR'
}
