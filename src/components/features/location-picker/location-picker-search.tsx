'use client'

import { useCallback, useEffect, useState } from 'react'

import { useDebounceCallback } from 'usehooks-ts'

import type { LngLat } from '@/utils/types/geo'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { FormInput } from '@/components/ui/form-input'
import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { searchAPI } from '@/redux/services/search-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LocationPickerSearch = ({ onLocationSelect }: { onLocationSelect: (lngLat: LngLat) => void }) => {
    const t = useI18n()
    const [value, setValue] = useState<string>('')
    const [search, { data, isFetching, isSuccess }] = searchAPI.useLazySearchQuery()

    const debouncedSearch = useDebounceCallback(search, 500)

    useEffect(() => {
        if (value.length >= 2) {
            debouncedSearch({ query: value })
        }
    }, [debouncedSearch, search, value])

    const handleSelect = useCallback(
        (item: ISearchItem<IPlacePreview | ILocationPreview>) => {
            onLocationSelect(item.coordinates)
        },
        [onLocationSelect],
    )

    return (
        <div className="relative">
            <FormInput
                type="text"
                name="search"
                value={value}
                placeholder={t('location_picker.placeholder')}
                onChange={event => setValue(event.target.value)}
            />

            {isSuccess && data && (
                <SearchAutocomplete
                    items={[
                        ...data.coordinates.map(coordinate => ({ ...coordinate })),
                        ...data.locations.map(location => ({ ...location })),
                    ]}
                    onSelect={handleSelect}
                />
            )}
        </div>
    )
}
