import { api } from '@/utils/redux/services/api'
import { ApplicationSettings } from '@/utils/redux/services/settings/settings.types'

export const settingsAPI = api.injectEndpoints({
    endpoints: build => ({
        getSettings: build.query<ApplicationSettings, void>({
            query: () => 'settings',
        }),
    }),
    overrideExisting: false,
})
