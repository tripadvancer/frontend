import 'server-only'

import { apiFetch } from '@/services/api'
import { IUser, IUserVisitedCountries } from '@/utils/types/user'

export async function getUserByUsername(username: string): Promise<IUser> {
    return apiFetch(`users/${encodeURIComponent(username)}`, { cache: 'no-cache', notFoundOn404: true })
}

// The session is optional: the owner always sees the visited map, other users only if it is public
export async function getUserVisitedCountries(userId: number): Promise<IUserVisitedCountries> {
    return apiFetch(`users/${userId}/visited-countries`, { cache: 'no-store', withSession: true })
}
