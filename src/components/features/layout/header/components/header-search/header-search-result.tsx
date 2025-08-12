'use client'

import { useEffect, useState } from 'react'

import { MapPinIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useDebounceCallback } from 'usehooks-ts'

import { searchAPI } from '@/redux/services/search/search.api'
import { transformSearchCountries, transformSearchPlaces } from '@/utils/helpers/search'
import { ICountryDict } from '@/utils/types/country'
import { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

import { HeaderSearchItem } from './header-search-item'

type HeaderSearchResultProps = {
    searchTerm: string
    setIsLoading: (loading: boolean) => void
    hideResults: () => void
}

export const HeaderSearchResult = ({ searchTerm, setIsLoading, hideResults }: HeaderSearchResultProps) => {
    const t = useTranslations()
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
        return <div className="py-3 pl-3 text-red-100">{t('component.search.result.error')}</div>
    }

    if (isFetching) {
        return <div className="py-3 pl-3 text-black-70">{t('component.search.result.loading')}</div>
    }

    if (isSuccess && items.length === 0) {
        return <div className="py-3 pl-3 text-black-70">{t('component.search.result.empty')}</div>
    }

    if (isSuccess && items.length > 0) {
        return items.map(item => (
            <HeaderSearchItem
                key={`header-search-item-${item.title}`}
                title={item.title}
                info={item.info}
                icon={<MapPinIcon />}
                href={
                    item.type === 'country'
                        ? `/countries/${(item.properties as ICountryDict).slug}`
                        : `/places/${(item.properties as IPlacePreview).id}`
                }
                hideResults={hideResults}
            />
        ))
    }

    return <div className="py-3 pl-3 text-black-70">{t('component.search.result.title')}</div>
}
