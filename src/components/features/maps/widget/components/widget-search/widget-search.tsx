'use client'

import { RefObject, useEffect, useRef, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { useLocale } from 'next-intl'
import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { setAppMode } from '@/redux/features/app-slice'
import { setMapLocationPopupInfo, setMapPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { searchAPI } from '@/redux/services/search/search.api'
import { AppModes, Keys } from '@/utils/enums'
import { getMapFlyToOptions } from '@/utils/helpers/maps'
import { transformFullSearchResult } from '@/utils/helpers/search'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { ICountryDict } from '@/utils/types/country'
import { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

import { WidgetTogler } from '../widget-togler'
import { WidgetSearchInput } from './widget-search-input'

export const WidgetSearch = () => {
    const dispatch = useAppDispatch()
    const locale = useLocale()

    const ref = useRef<HTMLDivElement>(null)

    const { map } = useMap()

    const [value, setValue] = useState<string>('')
    const [items, setItems] = useState<ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>[]>([])
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState<boolean>(false)

    const [search, { data, isFetching, isSuccess }] = searchAPI.useLazySearchQuery()

    const debouncedSearch = useDebounceCallback(search, 500)

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

    useKeypress(Keys.ESCAPE, () => {
        setIsAutocompleteVisible(false)
    })

    // TODO: Consider switching to a different package or waiting for a fix
    // Issue: `useOnClickOutside` does not support a `null` ref
    // More details: https://github.com/juliencrn/usehooks-ts/issues/663
    useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
        setIsAutocompleteVisible(false)
    })

    const handleInputClear = () => {
        setValue('')
        setItems([])
    }

    const handleInputClick = () => {
        if (items.length > 0) {
            setIsAutocompleteVisible(true)
        }
    }

    const handleSelect = (item: ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>) => {
        dispatch(setAppMode(AppModes.MAP))

        if (item.type === 'location') {
            map?.flyTo(getMapFlyToOptions(item.coordinates))
            dispatch(setMapLocationPopupInfo(item.properties as ILocationPreview))
        }

        if (item.type === 'place') {
            map?.flyTo(getMapFlyToOptions(item.coordinates))
            dispatch(setMapPlacePopupInfo(item.properties as IPlacePreview))
        }

        if (item.type === 'country') {
            const bounds = (item.properties as ICountryDict).bounds
            map?.fitBounds(bounds)
        }

        setIsAutocompleteVisible(false)
    }

    return (
        <div ref={ref} className="relative flex gap-x-4">
            <div className="relative flex-1">
                <WidgetSearchInput
                    value={value}
                    isLoading={isFetching}
                    onChange={setValue}
                    onClick={handleInputClick}
                    onClear={handleInputClear}
                />

                {isAutocompleteVisible && <SearchAutocomplete items={items} onSelect={handleSelect} />}
            </div>

            <WidgetTogler />
        </div>
    )
}
