import { api } from '@/utils/redux/services/api'
import { TranslateRequest, TranslateResponse } from '@/utils/redux/services/translate/translate.types'

export const translateApi = api.injectEndpoints({
    endpoints: builder => ({
        translate: builder.mutation<TranslateResponse, TranslateRequest>({
            query: body => ({
                url: '/translate',
                method: 'POST',
                body,
            }),
        }),
    }),
})
