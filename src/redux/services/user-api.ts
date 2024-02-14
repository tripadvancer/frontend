import type { IUserInfo } from '@/utils/types/user'

import { api } from './api'

export const userAPI = api.injectEndpoints({
    endpoints: build => ({
        getUserInfo: build.query<IUserInfo, void>({
            query: () => 'user',
            providesTags: ['UserInfo'],
        }),
    }),
    overrideExisting: false,
})
