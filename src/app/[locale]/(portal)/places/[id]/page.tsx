import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { IPhoto } from '@/utils/types/photo'

import { Achievement } from '@/components/achievement'
import { CoordinatesToCopy } from '@/components/coordinates-to-copy'
import { DraftToHtml } from '@/components/draft-to-html'
import { PhotoFeed } from '@/components/photo-feed'
import { PlacesNearbyFeed } from '@/components/places-nearby-feed/places-nearby-feed'
import { PlacesNearbyFeedSkeleton } from '@/components/places-nearby-feed/places-nearby-feed-skeleton'
import { ReviewFeed } from '@/components/reviews-feed/reviews-feed'
import { ReviewsFeedSkeleton } from '@/components/reviews-feed/reviews-feed-skeleton'
import { UserPreview } from '@/components/user-preview'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById, getPlacesNearby } from '@/services/places'
import { getReviewsByPlaceId } from '@/services/reviews'
import { ImageVariant } from '@/utils/enums'
import { FormattedDate, localizeCategories, makeImageUrl } from '@/utils/helpers'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

export default async function Place({
    params,
    searchParams,
}: {
    params: { locale: string; id: string }
    searchParams: { page: string }
}) {
    const currentPage = searchParams.page ?? '1'

    const t = await getScopedI18n('pages.place')
    const tCategories = await getScopedI18n('categories')
    const place = await getPlaceById(params.id)
    const placesNearby = await getPlacesNearby(params.id)
    const reviews = await getReviewsByPlaceId(params.id, currentPage)
    const country = getCountryByCode(place.countryCode.toUpperCase())

    const formattedDate = FormattedDate(place.createdAt, params.locale)
    const photosWithCover: IPhoto[] = place.photos.slice()
    const localizedCategories = localizeCategories(place.categories, tCategories)

    if (place.cover) {
        photosWithCover.unshift({ id: 0, url: place.cover })
    }

    return (
        <div className="flex flex-col">
            <div className="relative z-10 -mb-8 flex flex-[540px] items-center justify-center pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    {place.cover ? (
                        <Image
                            src={makeImageUrl(place.cover, ImageVariant.PUBLIC)}
                            className="object-cover"
                            alt={place.title}
                            fill
                            priority
                        />
                    ) : (
                        <Image
                            src={`https://source.unsplash.com/1920x1280/?${place.title}`}
                            className="object-cover"
                            alt={place.title}
                            fill
                            priority
                        />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto sm:w-2/3">
                        <Link
                            href={`/countries/${country?.slug}`}
                            className="mb-4 inline-block font-medium text-white hover:text-white"
                        >
                            {country?.name[params.locale]}
                        </Link>
                        <h1 className="mb-4 text-h1-m text-white sm:text-h1">{place.title}</h1>
                        <CoordinatesToCopy coordinates={place.location.coordinates} className="mb-4" />
                        <div className="flex justify-center gap-2">
                            {localizedCategories.map(category => (
                                <div
                                    key={category.id}
                                    className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white"
                                >
                                    {category.localizedName}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                        <div className="flex w-full flex-col gap-8 lg:w-64">
                            <Achievement
                                icon={
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 23V21H4.99264V1H6.97792V2H20.9987L18.022 7.99991L21 14H6.97792V21H7.97056V23H4ZM6.97792 12V4H17.787L15.8025 8.00009L17.7877 12H6.97792Z"
                                        />
                                    </svg>
                                }
                                title={place.title}
                            >
                                I was here
                            </Achievement>

                            <section>
                                <h3 className="mb-4 text-caps uppercase">{t('author.title')}</h3>
                                <UserPreview {...place.author} date={formattedDate} />
                            </section>

                            {placesNearby.length > 0 && (
                                <section>
                                    <h3 className="mb-4 text-caps uppercase">{t('place_nearby.title')}</h3>
                                    <Suspense fallback={<PlacesNearbyFeedSkeleton />}>
                                        <PlacesNearbyFeed places={placesNearby} />
                                    </Suspense>
                                </section>
                            )}
                        </div>

                        <div className="flex-1">
                            <section className="mb-16">
                                <h2 className="mb-8 text-h5-m sm:text-h5">{t('about.title')}</h2>
                                <DraftToHtml json={place.description} />
                            </section>

                            <section className="mb-16">
                                <h2 className="mb-8 text-h5-m sm:text-h5">{t('photos.title')}</h2>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                                    <PhotoFeed
                                        photos={photosWithCover}
                                        title={place.title}
                                        description={place.author.name}
                                        size={186}
                                    />
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-8 text-h5-m sm:text-h5">{t('reviews.title')}</h2>
                                <Suspense fallback={<ReviewsFeedSkeleton />}>
                                    <ReviewFeed
                                        reviews={reviews}
                                        currentPage={parseInt(currentPage)}
                                        variant="place-page"
                                    />
                                </Suspense>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
