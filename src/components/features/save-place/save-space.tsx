'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

import { SavePlaceLists } from './save-place-lists'

export const SavePlace = ({ placeId }: { placeId: number }) => {
    const t = useI18n()

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('save_place.title')}</h1>
            <hr className="border-black-70" />
            <SavePlaceLists placeId={placeId} />
        </div>
    )
}
