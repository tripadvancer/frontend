'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import { useRouter } from 'next/navigation'

import type { ICountryDict } from '@/utils/types/country'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { FormButton } from '@/components/ui/form-button'
import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { searchAPI } from '@/redux/services/search-api'
import { сountriesDictionary } from '@/utils/dictionaries/countries'
import { Keys } from '@/utils/enums'
import { transformSearchCountries, transformSearchPlaces } from '@/utils/helpers/search'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

import { LandingSearchInput } from './landing-search-input'

export const LandingSearch = () => {
    const t = useI18n()
    const locale = useCurrentLocale()
    const router = useRouter()
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
            const places = transformSearchPlaces(data, locale)
            const countries = transformSearchCountries(data, locale)
            setItems([...countries, ...places])
        } else {
            setItems([])
        }
    }, [data, isSuccess, locale, value])

    useEffect(() => {
        setIsAutocompleteVisible(items.length > 0)
    }, [items])

    useKeypress(Keys.ESCAPE, () => {
        setIsAutocompleteVisible(false)
    })

    useOnClickOutside(autocompleteRef, () => {
        setIsAutocompleteVisible(false)
    })

    const handleClear = () => {
        setValue('')
        setItems([])
    }

    const handleSelect = useCallback(
        (item: ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>) => {
            if (item.type === 'place') {
                router.push(`/places/${(item.properties as IPlacePreview).id}`)
            }
            if (item.type === 'country') {
                router.push(`/countries/${(item.properties as ICountryDict).slug}`)
            }
            setIsAutocompleteVisible(false)
        },
        [router],
    )

    const handleClick = () => {
        if (items.length > 0) {
            setIsAutocompleteVisible(true)
        }
    }

    return (
        <div className="m-auto mb-16 flex gap-x-2 sm:w-2/3">
            <div className="relative flex-1">
                <LandingSearchInput
                    value={value}
                    isLoading={isFetching}
                    onChange={setValue}
                    onClick={handleClick}
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
            <FormButton onClick={handleClick}>{t('pages.landing.search.button')}</FormButton>
        </div>
    )
}
