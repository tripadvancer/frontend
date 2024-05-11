'use client'

import { useEffect, useRef, useState } from 'react'
import { LngLatBoundsLike, useMap } from 'react-map-gl/maplibre'

import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import type { ICountryDict } from '@/utils/types/country'
import type { LngLat } from '@/utils/types/geo'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { setAppMode } from '@/redux/features/app-slice'
import { setMapLocationPopupInfo, setMapPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { searchAPI } from '@/redux/services/search-api'
import { AppModes, Keys } from '@/utils/enums'
import { getMapFlyToOptions } from '@/utils/helpers/maps'
import { transformFullSearchResult } from '@/utils/helpers/search'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'

import { WidgetTogler } from '../widget-togler'
import { WidgetSearchInput } from './widget-search-input'

export const WidgetSearch = () => {
    const dispatch = useAppDispatch()
    const locale = useCurrentLocale()

    const inputRef = useRef<HTMLInputElement>(null)
    const autocompleteRef = useRef<HTMLDivElement>(null)

    const { map } = useMap()

    const [value, setValue] = useState<string>('')
    const [items, setItems] = useState<ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>[]>([])
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState<boolean>(false)

    const [search, { data, isFetching, isSuccess }] = searchAPI.useLazySearchQuery()

    const debouncedSearch = useDebounceCallback(search, 500)
    const debouncedFlyTo = useDebounceCallback((lngLat: LngLat) => map?.flyTo(getMapFlyToOptions(lngLat)), 250)
    const debouncedFitBounds = useDebounceCallback((bounds: LngLatBoundsLike) => map?.fitBounds(bounds), 250)

    useEffect(() => {
        if (value.length >= 2) {
            debouncedSearch({ query: value })
        }
    }, [debouncedSearch, value])

    useEffect(() => {
        const isSearchSuccess = isSuccess && data && value.length >= 2
        setItems(isSearchSuccess ? transformFullSearchResult(data, locale) : [])
    }, [data, isSuccess, locale, value])

    useEffect(() => {
        setIsAutocompleteVisible(items.length > 0)
    }, [items])

    useOnClickOutside(autocompleteRef, () => {
        setIsAutocompleteVisible(false)
    })

    useKeypress(Keys.ESCAPE, () => {
        setIsAutocompleteVisible(false)
    })

    const handleClear = () => {
        setValue('')
        setItems([])
    }

    const handleSelect = (item: ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>) => {
        dispatch(setAppMode(AppModes.MAP))

        if (item.type === 'location') {
            debouncedFlyTo(item.coordinates)
            dispatch(setMapLocationPopupInfo(item.properties as ILocationPreview))
        }

        if (item.type === 'place') {
            debouncedFlyTo(item.coordinates)
            dispatch(setMapPlacePopupInfo(item.properties as IPlacePreview))
        }

        if (item.type === 'country') {
            const bounds = (item.properties as ICountryDict).bounds
            debouncedFitBounds(bounds)
        }

        setIsAutocompleteVisible(false)
    }

    const handleInputClick = () => {
        if (items.length > 0) {
            setIsAutocompleteVisible(true)
        }
    }

    return (
        <div className="relative flex gap-x-4">
            <div ref={inputRef} className="relative flex-1">
                <WidgetSearchInput
                    value={value}
                    isLoading={isFetching}
                    onChange={setValue}
                    onClick={handleInputClick}
                    onClear={handleClear}
                />

                {isAutocompleteVisible && (
                    <SearchAutocomplete ref={autocompleteRef} items={items} onSelect={handleSelect} />
                )}
            </div>

            <WidgetTogler />
        </div>
    )
}
