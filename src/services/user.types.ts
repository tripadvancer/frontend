import { SettingsCategories, UserPrivacySettings, UserRole } from '@/utils/enums'

export type GetUserInfoResponse = {
    id: number
    name: string
    avatar: string | null
    role: UserRole
}

export type GetUserSettingsResponse = {
    [SettingsCategories.PRIVACY]?: Partial<Record<UserPrivacySettings, boolean>>
}
