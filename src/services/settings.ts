import 'server-only'

import { apiFetch } from '@/services/api'
import { ApplicationSettings } from '@/utils/redux/services/settings/settings.types'

export async function getApplicationSettings(): Promise<ApplicationSettings> {
    return apiFetch('settings', { next: { revalidate: 60 } })
}
