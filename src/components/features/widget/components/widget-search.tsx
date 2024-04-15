'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

import { CloseIcon16, SearchIcon16 } from '@/components/ui/icons'
import { Spinner } from '@/components/ui/spinner'
import { setMapLocationPopupInfo, setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { searchAPI } from '@/redux/services/search-api'
import { getCountryByCode } from '@/services/countries'
import { Keys } from '@/utils/enums'
import { getFlyToViewState } from '@/utils/helpers/maps'
import { useDebounce } from '@/utils/hooks/use-debounce'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useOnClickOutside } from '@/utils/hooks/use-on-click-outside'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSearchAutocomplete } from './widget-search-autocomplete'

export const WidgetSearch = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const locale = useCurrentLocale()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [suggestions, setSuggestions] = useState<ISearchItem<IPlacePreview | ILocationPreview>[]>([])
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<boolean>(false)
    const [suggestionsPosition, setSuggestionsPosition] = useState<{ top: number; left: number; width?: number }>({
        top: 0,
        left: 0,
    })

    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    // Fetch search results
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const query = debouncedSearchTerm
    const skip = debouncedSearchTerm.length < 2
    const searchResult = searchAPI.useSearchQuery({ query }, { skip })

    useEffect(() => {
        setSuggestions([])

        if (searchTerm.length >= 2 && searchResult.isSuccess) {
            const items = searchResult.data
            const coordinates = items.coordinates.map(coordinate => ({ ...coordinate }))
            const places = items.places.map(place => {
                const country = getCountryByCode(place.properties.countryCode)
                return {
                    ...place,
                    info: country?.name[locale] ?? '', // Provide a default empty string value
                }
            })
            const locations = items.locations.map(location => ({ ...location }))
            // Merge all search results into one array
            setSuggestions([...coordinates, ...places, ...locations])
        }
    }, [locale, searchResult, searchTerm])

    useEffect(() => {
        setIsSuggestionsVisible(suggestions.length > 0)
    }, [suggestions])

    useEffect(() => {
        const inputRect = inputRef.current?.getBoundingClientRect()
        setSuggestionsPosition({
            top: inputRect?.bottom || 0,
            left: inputRect?.left || 0,
            width: inputRect?.width,
        })
    }, [isSuggestionsVisible])

    useOnClickOutside(suggestionsRef, () => {
        setIsSuggestionsVisible(false)
    })

    useKeypress(Keys.ESCAPE, () => {
        setIsSuggestionsVisible(false)
    })

    const handleClearSearch = () => {
        setSearchTerm('')
        setSuggestions([])
        inputRef.current?.focus()
    }

    const handleSelect = (cursor: number) => {
        const viewState = getFlyToViewState(suggestions[cursor].coordinates)
        dispatch(setMapViewState(viewState))
        if (suggestions[cursor].type === 'location') {
            dispatch(setMapLocationPopupInfo(suggestions[cursor].properties as ILocationPreview))
        }
        if (suggestions[cursor].type === 'place') {
            dispatch(setMapPlacePopupInfo(suggestions[cursor].properties as IPlacePreview))
        }
        setIsSuggestionsVisible(false)
        dispatch(closeWidget())
    }

    const handleSearchClick = () => {
        if (searchTerm.length > 0) {
            setIsSuggestionsVisible(true)
        }
    }

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100">
                {searchResult.isFetching ? <Spinner size={16} /> : <SearchIcon16 />}
            </div>

            <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                className="hover-animated h-10 w-full rounded-lg border border-blue-20 bg-white px-10 placeholder:text-black-40 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder={t('widget.search.placeholder')}
                onChange={e => setSearchTerm(e.target.value)}
                onClick={handleSearchClick}
            />

            {searchTerm.length > 0 && (
                <div
                    className="hover-animated absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-black-15 hover:text-blue-active"
                    onClick={handleClearSearch}
                >
                    <CloseIcon16 />
                </div>
            )}

            {isSuggestionsVisible &&
                createPortal(
                    <WidgetSearchAutocomplete
                        ref={suggestionsRef}
                        style={suggestionsPosition}
                        suggestions={suggestions}
                        onSelect={handleSelect}
                    />,
                    document.body,
                )}
        </div>
    )
}
