'use client'

import { useTranslations } from 'next-intl'

import { listAPI } from '@/redux/services/list-api'

import { SavePlaceListsForm } from './save-place-lists-form'

export const SavePlaceLists = ({ placeId }: { placeId: number }) => {
    const t = useTranslations()

    const { data: lists, isError, isSuccess } = listAPI.useGetListsQuery()

    if (isError) {
        return <div className="text-center text-black-40">{t('common.error')}</div>
    }

    if (isSuccess && lists) {
        return <SavePlaceListsForm lists={lists} placeId={placeId} />
    }

    return <div>{t('common.loading')}</div>
}
