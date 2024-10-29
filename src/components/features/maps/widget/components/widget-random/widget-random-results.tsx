'use client'

import { useTranslations } from 'next-intl'

import { useUserLocation } from '@/utils/hooks/use-user-location'
import { IRandomPlace } from '@/utils/types/place'

import { WidgetMessage } from '../widget-message'
import { WidgetRandomPlace } from './widget-random-place'

type WidgetRandomResultsProps = {
    place: IRandomPlace | undefined
    isSuccess: boolean
    isError: boolean
    isUserLocated: boolean
}

export const WidgetRandomResults = ({ place, isSuccess, isError, isUserLocated }: WidgetRandomResultsProps) => {
    const t = useTranslations()
    const { handleLocate, isLocating } = useUserLocation()

    if (isError) {
        return <WidgetMessage />
    }

    if (!isUserLocated) {
        return (
            <WidgetMessage
                message={t('map.widget.random.notLocation')}
                actionCaption={t('common.action.locateMe')}
                isLoading={isLocating}
                onAction={handleLocate}
            />
        )
    }

    if (isSuccess && !place) {
        return (
            <div className="m-auto text-center text-black-40">
                {t.rich('map.widget.random.emptyMessage', { br: () => <br /> })}
            </div>
        )
    }

    if (isSuccess && place) {
        return <WidgetRandomPlace {...place} />
    }

    return null
}
