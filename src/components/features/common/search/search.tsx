'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { SearchAutocomplete } from '@/components/ui/search-autocomplete'
import { searchAPI } from '@/redux/services/search-api'
import { Keys } from '@/utils/enums'
import { transformSearchCountries, transformSearchPlaces } from '@/utils/helpers/search'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { ICountryDict } from '@/utils/types/country'
import { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

import { SearchInput } from './search-input'

export const Search = () => {
    const t = useTranslations()
    const router = useRouter()

    const ref = useRef<HTMLDivElement>(null)
    const refInput = useRef<HTMLInputElement>(null)

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
            const places = transformSearchPlaces(data)
            const countries = transformSearchCountries(data)
            setItems([...countries, ...places])
        } else {
            setItems([])
        }
    }, [data, isSuccess, value])

    useEffect(() => {
        setIsAutocompleteVisible(items.length > 0)
    }, [items])

    useKeypress(Keys.ESCAPE, () => {
        setIsAutocompleteVisible(false)
    })

    useOnClickOutside(ref, () => {
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

    const handleButtonClick = () => {
        refInput.current?.focus()
        handleInputClick()
    }

    return (
        <div ref={ref} className="m-auto mb-16 flex gap-x-2 sm:w-2/3">
            <div className="relative flex-1">
                <SearchInput
                    ref={refInput}
                    value={value}
                    isLoading={isFetching}
                    onChange={setValue}
                    onClick={handleInputClick}
                    onClear={handleInputClear}
                />

                {isAutocompleteVisible && <SearchAutocomplete items={items} onSelect={handleSelect} />}
            </div>
            <FormButton className="hidden sm:block" onClick={handleButtonClick}>
                {t('component.search.button')}
            </FormButton>
        </div>
    )
}
