'use client'

import { useEffect, useState } from 'react'

import { useDebounceCallback } from 'usehooks-ts'

import { searchAPI } from '@/redux/services/search-api'
import { transformSearchCountries, transformSearchPlaces } from '@/utils/helpers/search'
import { ICountryDict } from '@/utils/types/country'
import { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

import { HeaderSearchItem } from './header-search-item'

type HeaderSearchResultProps = {
    searchTerm: string
    setIsLoading: (loading: boolean) => void
}

export const HeaderSearchResult = ({ searchTerm, setIsLoading }: HeaderSearchResultProps) => {
    const [items, setItems] = useState<ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>[]>([])
    const [search, { data, isFetching, isSuccess, isError }] = searchAPI.useLazySearchQuery()

    const debouncedSearch = useDebounceCallback(search, 500)

    useEffect(() => {
        if (searchTerm.length >= 2) {
            debouncedSearch({ query: searchTerm })
        }
    }, [debouncedSearch, searchTerm])

    useEffect(() => {
        setIsLoading(isFetching)
    }, [isFetching, setIsLoading])

    useEffect(() => {
        if (isSuccess && data && searchTerm.length >= 2) {
            const places = transformSearchPlaces(data)
            const countries = transformSearchCountries(data)
            setItems([...countries, ...places])
        } else {
            setItems([])
        }
    }, [data, isSuccess, searchTerm])

    if (isError) {
        return <div className="py-3 pl-3 text-red-100">Error occurred while searching</div>
    }

    if (isFetching) {
        return <div className="py-3 pl-3 text-black-70">Searching...</div>
    }

    if (isSuccess && items.length === 0) {
        return <div className="py-3 pl-3 text-black-70">No results found</div>
    }

    if (isSuccess && items.length > 0) {
        return items.map(item => (
            <HeaderSearchItem
                key={`header-search-item-${item}`}
                title={item.title}
                info={item.info}
                icon={undefined}
                href="#"
            />
        ))
    }

    return <div className="py-3 pl-3 text-black-70">Type country, place or location to search</div>
}
