'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import type { LngLat } from '@/utils/types/geo'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { CloseIcon16, SearchIcon16 } from '@/components/ui/icons'
import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { Spinner } from '@/components/ui/spinner'
import { searchAPI } from '@/redux/services/search-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LocationPickerSearch = ({ onLocationSelect }: { onLocationSelect: (lngLat: LngLat) => void }) => {
    const t = useI18n()

    const autocompleteRef = useRef<HTMLDivElement>(null)

    const [value, setValue] = useState<string>('')
    const [items, setItems] = useState<ISearchItem<IPlacePreview | ILocationPreview>[]>([])
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState<boolean>(false)

    const [search, { data, isFetching, isSuccess }] = searchAPI.useLazySearchQuery()

    const debouncedSearch = useDebounceCallback(search, 500)

    useEffect(() => {
        if (value.length >= 2) {
            debouncedSearch({ query: value })
        }
    }, [debouncedSearch, value])

    useEffect(() => {
        if (isSuccess && data && value.length >= 2) {
            const coordinates = data.coordinates.map(coordinate => ({ ...coordinate }))
            const locations = data.locations.map(location => ({ ...location }))
            setItems([...coordinates, ...locations])
        } else {
            setItems([])
        }
    }, [data, isSuccess, value])

    useEffect(() => {
        setIsAutocompleteVisible(items.length > 0)
    }, [items])

    useOnClickOutside(autocompleteRef, () => {
        setIsAutocompleteVisible(false)
    })

    const handleClearSearch = () => {
        setValue('')
        setItems([])
    }

    const handleSelect = useCallback(
        (item: ISearchItem<IPlacePreview | ILocationPreview>) => {
            onLocationSelect(item.coordinates)
            setIsAutocompleteVisible(false)
        },
        [onLocationSelect],
    )

    const handleInputClick = () => {
        if (items.length > 0) {
            setIsAutocompleteVisible(true)
        }
    }

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100">
                {isFetching ? <Spinner size={16} /> : <SearchIcon16 />}
            </div>

            <input
                type="text"
                name="search"
                value={value}
                autoComplete="off"
                placeholder={t('location_picker.placeholder')}
                className="hover-animated h-10 w-full rounded-lg border border-black-15 bg-white px-10 placeholder:text-black-40 focus:border-black-40 focus:outline-none disabled:cursor-no-drop"
                onClick={handleInputClick}
                onChange={event => setValue(event.target.value)}
            />

            {value.length > 0 && (
                <div
                    className="hover-animated absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-black-15 hover:text-blue-active"
                    onClick={handleClearSearch}
                >
                    <CloseIcon16 />
                </div>
            )}

            {isAutocompleteVisible && (
                <SearchAutocomplete ref={autocompleteRef} items={items} onSelect={handleSelect} />
            )}
        </div>
    )
}
