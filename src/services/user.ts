import 'server-only'

import { apiFetch } from '@/services/api'
import { GetUserInfoResponse, GetUserSettingsResponse } from '@/services/user.types'

export async function getUserInfo(): Promise<GetUserInfoResponse> {
    return apiFetch('user', { cache: 'no-store', withSession: true })
}

export async function getUserSettings(): Promise<GetUserSettingsResponse> {
    return apiFetch('user/settings', { cache: 'no-store', withSession: true })
}
