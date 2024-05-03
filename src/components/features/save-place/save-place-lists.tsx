'use client'

import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SavePlaceListsItem } from './save-place-lists-item'

export const SavePlaceLists = ({ placeId }: { placeId: number }) => {
    const t = useI18n()

    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    if (isError) {
        return <div className="text-center text-black-40">{t('common.error')}</div>
    }

    if (isSuccess && lists.length === 0) {
        return <div className="text-center text-black-40">{t('save_place.empty', { br: <br /> })}</div>
    }

    if (isSuccess && lists.length > 0) {
        return (
            <div>
                {lists?.map(list => <SavePlaceListsItem key={`list-${list.id}`} list={list} placeId={placeId} />)}
            </div>
        )
    }

    return <div>{t('save_place.loading')}</div>
}
