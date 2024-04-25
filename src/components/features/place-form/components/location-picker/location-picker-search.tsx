'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import type { ICountryDict } from '@/utils/types/country'
import type { LngLat } from '@/utils/types/geo'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { searchAPI } from '@/redux/services/search-api'
import { transformSearchCoordinates, transformSearchLocations } from '@/utils/helpers/search'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetPickerSearchInput } from './location-picker-search-input'

export const LocationPickerSearch = ({ onLocationSelect }: { onLocationSelect: (lngLat: LngLat) => void }) => {
    const t = useI18n()

    const autocompleteRef = useRef<HTMLDivElement>(null)

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
        if (isSuccess && data && value.length >= 2) {
            const coordinates = transformSearchCoordinates(data)
            const locations = transformSearchLocations(data)
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

    const handleClear = () => {
        setValue('')
        setItems([])
    }

    const handleSelect = useCallback(
        (item: ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>) => {
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
            <WidgetPickerSearchInput
                value={value}
                isLoading={isFetching}
                onChange={setValue}
                onClick={handleInputClick}
                onClear={handleClear}
            />

            {isAutocompleteVisible && (
                <SearchAutocomplete
                    ref={autocompleteRef}
                    items={items}
                    className="absolute left-0 right-0 top-full z-40"
                    onSelect={handleSelect}
                />
            )}
        </div>
    )
}
