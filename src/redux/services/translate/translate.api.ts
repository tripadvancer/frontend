import { api } from '@/redux/services/api'
import { TranslateRequest, TranslateResponse } from '@/redux/services/translate/translate.types'

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
