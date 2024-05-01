'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import type { ICountryDict } from '@/utils/types/country'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { setMapLocationPopupInfo, setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { searchAPI } from '@/redux/services/search-api'
import { Keys } from '@/utils/enums'
import { getFlyToViewState } from '@/utils/helpers/maps'
import { transformFullSearchResult } from '@/utils/helpers/search'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'

import { WidgetSearchInput } from './widget-search-input'

export const WidgetSearch = () => {
    const dispatch = useAppDispatch()
    const locale = useCurrentLocale()

    const inputRef = useRef<HTMLInputElement>(null)
    const autocompleteRef = useRef<HTMLDivElement>(null)

    const [value, setValue] = useState<string>('')
    const [items, setItems] = useState<ISearchItem<IPlacePreview | ILocationPreview>[]>([])
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState<boolean>(false)
    const [autocompleteStyles, setAutocompleteStyles] = useState<{ top: number; left: number; width?: number }>({
        top: 0,
        left: 0,
    })

    const [search, { data, isFetching, isSuccess }] = searchAPI.useLazySearchQuery()

    const debouncedSearch = useDebounceCallback(search, 500)

    useEffect(() => {
        const inputRect = inputRef.current?.getBoundingClientRect()
        setAutocompleteStyles({
            top: inputRect?.bottom || 0,
            left: inputRect?.left || 0,
            width: inputRect?.width,
        })
    }, [])

    useEffect(() => {
        if (value.length >= 2) {
            debouncedSearch({ query: value })
        }
    }, [debouncedSearch, value])

    useEffect(() => {
        setItems(isSuccess && data && value.length >= 2 ? transformFullSearchResult(data, locale) : [])
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

    const handleSelect = useCallback(
        (item: ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>) => {
            const viewState = getFlyToViewState(item.coordinates)
            dispatch(setMapViewState(viewState))

            if (item.type === 'location') {
                dispatch(setMapLocationPopupInfo(item.properties as ILocationPreview))
            }

            if (item.type === 'place') {
                dispatch(setMapPlacePopupInfo(item.properties as IPlacePreview))
            }

            dispatch(closeWidget())
            setIsAutocompleteVisible(false)
        },
        [dispatch],
    )

    const handleInputClick = () => {
        if (items.length > 0) {
            setIsAutocompleteVisible(true)
        }
    }

    return (
        <div className="relative">
            <WidgetSearchInput
                ref={inputRef}
                value={value}
                isLoading={isFetching}
                onChange={setValue}
                onClick={handleInputClick}
                onClear={handleClear}
            />

            {isAutocompleteVisible &&
                createPortal(
                    <SearchAutocomplete
                        ref={autocompleteRef}
                        items={items}
                        className="fixed z-40"
                        styles={autocompleteStyles}
                        onSelect={handleSelect}
                    />,
                    document.body,
                )}
        </div>
    )
}
