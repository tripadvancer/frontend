import { SettingsCategories, UserPrivacySettings } from '@/utils/enums'

export type GetUserInfoResponse = {
    id: number
    name: string
    avatar: string | null
}

export type GetUserSettingsResponse = {
    [SettingsCategories.PRIVACY]?: Partial<Record<UserPrivacySettings, boolean>>
}
