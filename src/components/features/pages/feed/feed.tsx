'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { ShowMore } from '@/components/ui/show-more'
import { feedAPI } from '@/utils/redux/services/feed/feed.api'

import { FeedCountryFilter } from './feed-country-filter'
import { FeedItem } from './feed-item'
import { FeedItemSkeleton } from './feed-item-skeleton'

const initialSkeletonCount = 3

export const Feed = () => {
    const t = useTranslations()
    const [cursor, setCursor] = useState<number>()
    const [selectedCountryCodes, setSelectedCountryCodes] = useState<string[]>([])
    const sentinelRef = useRef<HTMLDivElement>(null)
    const countryCodes = [...selectedCountryCodes].sort()
    const {
        currentData: data,
        isFetching,
        isLoading,
        isError,
        refetch,
    } = feedAPI.useGetFeedQuery({ cursor, countryCodes }, { refetchOnMountOrArgChange: true })

    const handleCountryChange = (updatedCountryCodes: string[]) => {
        setCursor(undefined)
        setSelectedCountryCodes(updatedCountryCodes)
    }

    const loadMore = useCallback(() => {
        if (isFetching || !data?.nextCursor) return
        setCursor(data.nextCursor)
    }, [data?.nextCursor, isFetching])

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel || !data?.nextCursor || isFetching) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    loadMore()
                }
            },
            { rootMargin: '600px 0px' },
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [data?.nextCursor, isFetching, loadMore])

    const hasItems = Boolean(data?.items.length)

    return (
        <div className="container py-16 sm:py-24">
            <div className="inner-container">
                <h1 className="h1 mb-8">{t('page.feed.title')}</h1>

                <div className="flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                    <aside className="w-full flex-none lg:w-64">
                        <FeedCountryFilter selectedCountryCodes={selectedCountryCodes} onChange={handleCountryChange} />
                    </aside>

                    <section className="min-w-0 flex-1">
                        {isError && !hasItems && (
                            <div className="mt-16 text-center text-black-40">
                                <p>{t('common.error')}</p>
                                <button className="link mt-4" onClick={() => refetch()}>
                                    {t('common.action.tryAgain')}
                                </button>
                            </div>
                        )}

                        {isLoading && (
                            <div>
                                {Array.from({ length: initialSkeletonCount }, (_, index) => (
                                    <FeedItemSkeleton key={`feed-item-skeleton-${index}`} />
                                ))}
                            </div>
                        )}

                        {data && data.items.length === 0 && !isFetching && (
                            <div className="mt-16 text-center text-black-40">{t('page.feed.empty')}</div>
                        )}

                        {hasItems && (
                            <>
                                <div>
                                    {data?.items.map(item => (
                                        <FeedItem key={`feed-item-${item.id}`} item={item} />
                                    ))}
                                </div>

                                {data?.nextCursor && (
                                    <div ref={sentinelRef} className="pt-8">
                                        {isError ? (
                                            <div className="text-center text-black-40">
                                                <p>{t('common.error')}</p>
                                                <button className="link mt-4" onClick={() => refetch()}>
                                                    {t('common.action.tryAgain')}
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {isFetching && <FeedItemSkeleton />}
                                                {!isFetching && <ShowMore onClick={loadMore} isLoading={isFetching} />}
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
