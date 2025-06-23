'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import { searchAPI } from '@/redux/services/search-api'
import { transformSearchCoordinates, transformSearchLocations } from '@/utils/helpers/search'
import { LngLat } from '@/utils/types/geo'
import { ILocationPreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

import { LocationPickerMapSearchInput } from './location-picker-map-search-input'

type LocationPickerSearchProps = {
    onSelect: (lngLat: LngLat) => void
    onHide: () => void
}

export const LocationPickerMapSearch = ({ onSelect, onHide }: LocationPickerSearchProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const [value, setValue] = useState<string>('')
    const [items, setItems] = useState<ISearchItem<ILocationPreview>[]>([])
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

    const handleSelect = (item: ISearchItem<ILocationPreview>) => {
        onSelect(item.coordinates)
        setIsAutocompleteVisible(false)
    }

    return (
        <div ref={ref} className="w-full rounded-lg bg-white shadow-black sm:w-72">
            <LocationPickerMapSearchInput
                value={value}
                isLoading={isFetching}
                onHide={onHide}
                onChange={setValue}
                onClear={handleInputClear}
                onClick={handleInputClick}
            />

            {isAutocompleteVisible && (
                <div className="px-1 pb-1">
                    {items.map((item, index) => (
                        <div
                            key={`search-item-${item.title}-${index}`}
                            className="group cursor-pointer overflow-hidden rounded-md px-2 py-1 hover:bg-black-5"
                            onClick={() => handleSelect(item)}
                        >
                            <div className="line-clamp-1 break-words group-hover:text-blue-active">{item.title}</div>
                            <div className="line-clamp-2 break-words text-black-40">{item.info}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
