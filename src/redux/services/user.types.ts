import { SettingsCategories, UserPrivacySettings, UserSocialApps } from '@/utils/enums'

export type UpdateUserDataInputs = Partial<{
    name: string
    info: string
    social: Partial<Record<UserSocialApps, string>>
    settings: {
        [SettingsCategories.PRIVACY]?: Partial<Record<UserPrivacySettings, boolean>>
    }
}>

export type ChangeUserPasswordInputs = {
    oldPassword: string
    newPassword: string
}

export type ChangeUserEmailInputs = {
    newEmail: string
    password: string
}

export type UpdateUserDataResponse = {
    status: 'OK' | 'USERNAME_ALREADY_EXISTS_ERROR' | 'USERNAME_INVALID_FORMAT_ERROR'
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
