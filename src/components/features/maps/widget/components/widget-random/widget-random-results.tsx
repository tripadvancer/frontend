'use client'

import { useTranslations } from 'next-intl'

import { WidgetMessage } from '../widget-message'
import { WidgetRandomPlace } from './widget-random-place'

type WidgetRandomResultsProps = {
    place:
        | {
              id: number
              title: string
              description: string
              cover: string | null
              avgRating: number | null
              reviewsCount: number
              countryCode: string | null
              isSaved: boolean
              coordinates: number[]
          }
        | undefined
    isSuccess: boolean
    isError: boolean
    isUserLocated: boolean
}

export const WidgetRandomResults = ({ place, isSuccess, isError, isUserLocated }: WidgetRandomResultsProps) => {
    const t = useTranslations()

    if (isError) {
        return <WidgetMessage />
    }

    if (!isUserLocated) {
        return <WidgetMessage message={t('map.widget.random.notLocation')} />
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
