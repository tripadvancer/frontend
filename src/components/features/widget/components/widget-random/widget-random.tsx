'use client'

import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { useMediaQuery } from 'usehooks-ts'

import { setMapViewState } from '@/redux/features/map-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { getFlyToViewState, getMapFlyToOptions } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetRandomButton } from './widget-random-button'
import { WidgetRandomResults } from './widget-random-results'
import { WidgetRandomSlider } from './widget-random-slider'

export const WidgetRandom = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const userLocation = useAppSelector(getUserLocation)
    const isMobile = useMediaQuery('(max-width: 639px)')

    const { map } = useMap()

    const [radius, setRadius] = useState(15)
    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    useEffect(() => {
        if (userLocation) {
            if (isMobile) {
                const viewState = getFlyToViewState(userLocation)
                dispatch(setMapViewState(viewState))
                return
            }

            map?.flyTo(getMapFlyToOptions(userLocation))
        }
    }, [userLocation, map, dispatch, isMobile])

    const handleRandomClick = () => {
        if (userLocation) {
            searchRandomPlace({
                ...userLocation,
                radius: radius * 1000, // km to m
                categories: widgetState.selectedCategories,
            })
        }
    }

    return (
        <div>
            <div className="mb-6 text-caps uppercase">{t('widget.random.distance_cation')}</div>
            {/* prettier-ignore */}
            <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                <WidgetRandomSlider
                    value={radius}
                    onChange={setRadius}
                />
                <WidgetRandomButton
                    isLoading={isFetching}
                    isUserLocated={!!userLocation}
                    onClick={handleRandomClick}
                />
                <WidgetRandomResults
                    place={data}
                    isSuccess={isSuccess}
                    isError={!!error}
                    isUserLocated={!!userLocation}
                />
            </div>
        </div>
    )
}
