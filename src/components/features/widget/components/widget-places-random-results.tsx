'use client'

import type { IRandomPlace } from '@/utils/types/place'

import { useUserLocation } from '@/utils/hooks/use-user-location'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from './widget-message'
import { WidgetPlacesRandomPlace } from './widget-places-random-place'

type WidgetRandomResultsProps = {
    place: IRandomPlace | undefined
    isSuccess: boolean
    isError: boolean
    isUserLocated: boolean
}

export const WidgetPlacesRandomResults = ({ place, isSuccess, isError, isUserLocated }: WidgetRandomResultsProps) => {
    const t = useI18n()
    const { handleLocate, isLocating } = useUserLocation()

    if (isError) {
        return <WidgetMessage />
    }

    if (!isUserLocated) {
        return (
            <>
                <WidgetMessage
                    message={t('widget.places.random.error.not_location')}
                    actionCaption={t('common.action.locate_me')}
                    isLoading={isLocating}
                    onAction={handleLocate}
                />
                <p className="text-center text-small text-black-40">
                    {t('widget.places.random.error.not_location.info')}
                </p>
            </>
        )
    }

    if (isSuccess && !place) {
        return <WidgetMessage message={t('widget.places.random.error.not_found')} />
    }

    if (isSuccess && place) {
        return <WidgetPlacesRandomPlace {...place} />
    }

    return <div className="m-auto w-2/3 text-center text-small text-black-40">{t('widget.places.random.intro')}</div>
}
