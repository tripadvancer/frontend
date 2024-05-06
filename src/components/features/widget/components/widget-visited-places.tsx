'use client'

import { useEffect, useMemo } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { useDialog } from '@/providers/dialog-provider'
import { visitedAPI } from '@/redux/services/visited-api'
import { arrayToLngLat, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SignIn } from '../../auth/sign-in'
import { WidgetMessage } from './widget-message'
import { WidgetPlacesFeed } from './widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from './widget-places-feed/widget-places-feed-skeleton'

export const WidgetVisitedPlaces = ({ isAuth }: { isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()

    const { map } = useMap()
    const { data, isError, isLoading, isSuccess, refetch } = visitedAPI.useGetVisitedQuery(undefined, { skip: !isAuth })

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    useEffect(() => {
        // Calculate bounds for the list places
        if (isSuccess && places.length > 0) {
            if (places.length === 1) {
                const lngLat = arrayToLngLat(places[0].coordinates)
                map?.flyTo(getMapFlyToOptions(lngLat))
                return
            }

            const bounds = getBoundsFromCoordinates(places.map(place => place.coordinates))
            map?.fitBounds(bounds)
        }
    }, [isSuccess, places, map])

    if (!isAuth) {
        return (
            <WidgetMessage
                message={t('widget.visited_places.not_logged_in', {
                    br: <br />,
                    sign_in_link: (
                        <span className="link" onClick={() => dialog.open(<SignIn />)}>
                            {t('widget.sign_in_link')}
                        </span>
                    ),
                })}
            />
        )
    }

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places.length === 0) {
        return <WidgetMessage message={t('widget.visited_places.empty_message', { br: <br /> })} />
    }

    if (isSuccess && places.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
