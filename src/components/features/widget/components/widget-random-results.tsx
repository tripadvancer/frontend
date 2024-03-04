'use client'

import { IPlacePreview } from '@/utils/types/place'

import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from './widget-message'
import { WidgetRandomPlace } from './widget-random-place'

type WidgetRandomResultsProps = {
    place: IPlacePreview | undefined
    isSuccess: boolean
    isError: boolean

    isUserLocated: boolean
}

export const WidgetRandomResults = ({ place, isSuccess, isError, isUserLocated }: WidgetRandomResultsProps) => {
    const t = useI18n()

    if (isError) {
        return <WidgetMessage />
    }

    if (!isUserLocated) {
        return <WidgetMessage message={t('widget.random.error.not_location')} />
    }

    if (isSuccess && !place) {
        return <WidgetMessage message={t('widget.random.error.not_found', { br: <br /> })} />
    }

    if (isSuccess && place) {
        return <WidgetRandomPlace {...place} />
    }

    return null
}
