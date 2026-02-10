'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useDebounceCallback } from 'usehooks-ts'

import Image from 'next/image'

import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { searchAPI } from '@/redux/services/search/search.api'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'
import { transformSearchCountries, transformSearchPlaces } from '@/utils/helpers/search'
import { ICountryDict } from '@/utils/types/country'
import { IPlacePreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

import { SearchItem } from './search-item'

type SearchResultProps = {
    searchTerm: string
    setIsLoading: (loading: boolean) => void
    hideResults: () => void
}

export const SearchResult = ({ searchTerm, setIsLoading, hideResults }: SearchResultProps) => {
    const t = useTranslations()
    const [items, setItems] = useState<ISearchItem<IPlacePreview | ICountryDict>[]>([])
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
            <SearchItem
                key={`search-item-${item.title}`}
                title={item.title}
                info={item.info}
                icon={
                    item.type === 'country' ? (
                        <ImageWithFallback
                            src={`/images/countries/preview/${(item.properties as ICountryDict).code.toLowerCase()}.jpg`}
                            alt={(item.properties as ICountryDict).name['en']}
                            width={36}
                            height={36}
                            className="aspect-square rounded-md"
                        />
                    ) : (
                        <ImageWithFallback
                            src={makeImageUrl((item.properties as IPlacePreview).cover, ImageVariants.PREVIEW)}
                            alt={(item.properties as IPlacePreview).title}
                            width={36}
                            height={36}
                            className="aspect-square rounded-md"
                        />
                    )
                }
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
