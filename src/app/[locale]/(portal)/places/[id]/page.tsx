import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { ButtonMinor } from '@/components/forms/button-minor/button-minor'
import { Rating } from '@/components/rating'
import { ReviewFeed } from '@/components/reviews-feed/reviews-feed'
import { ReviewsFeedSkeleton } from '@/components/reviews-feed/reviews-feed-skeleton'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById, getPlacesNearby } from '@/services/places'
import { getReviewsByPlaceId } from '@/services/reviews'
import { ImageVariant } from '@/utils/enums'
import { FormattedDate, localizeCategories, makeImageUrl } from '@/utils/helpers'
import { getI18n, getScopedI18n } from '@/utils/i18n/i18n.server'

import { AddReviewButton } from './_components/add-review-button'
import { CoordinatesToCopy } from './_components/coordinates-to-copy'
import { DraftToHtml } from './_components/draft-to-html'
import { Photos } from './_components/photos'
import { PlaceAchivement } from './_components/place-achievement'
import { PlacesNearbyFeed } from './_components/places-nearby-feed'
import { PlacesNearbyFeedSkeleton } from './_components/places-nearby-feed-skeleton'
import { UserActions } from './_components/user-actions'
import { UserPreview } from './_components/user-preview'

export default async function Place({
    params,
    searchParams,
}: {
    params: { locale: string; id: string }
    searchParams: { page: string }
}) {
    const currentPage = searchParams.page ?? '1'

    const t = await getI18n()
    const tCategories = await getScopedI18n('categories')
    const place = await getPlaceById(params.id)
    const placesNearby = await getPlacesNearby(params.id)
    const reviews = await getReviewsByPlaceId(params.id, currentPage)
    const country = getCountryByCode(place.countryCode.toUpperCase())

    const formattedDate = FormattedDate(place.createdAt, params.locale)
    const localizedCategories = localizeCategories(place.categories, tCategories)
    const rating = place.avgRating === 0 ? '0.00' : place.avgRating.toFixed(1)

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
                            <PlaceAchivement title={place.title} />

                            <div className="flex flex-col items-center gap-y-2">
                                <Rating value={place.avgRating} size={32} />
                                <p className="text-sm text-black-40">
                                    {place.avgRating === 0
                                        ? t('place.rating.empty')
                                        : t('place.rating', {
                                              reviews: (
                                                  <Link href={'#reviews'}>
                                                      {t('place.reviews', { count: place.avgRating })}
                                                  </Link>
                                              ),
                                              avg_rating: rating,
                                          })}
                                </p>
                            </div>

                            <section className="flex flex-col gap-y-4">
                                <UserPreview {...place.author} date={formattedDate} />
                                <UserActions placeId={place.id} />
                            </section>

                            {placesNearby.length > 0 && (
                                <section>
                                    <h3 className="mb-4 text-caps uppercase">{t('pages.place.place_nearby.title')}</h3>
                                    <Suspense fallback={<PlacesNearbyFeedSkeleton />}>
                                        <PlacesNearbyFeed places={placesNearby} />
                                    </Suspense>
                                </section>
                            )}
                        </div>

                        <div className="flex-1">
                            <section className="mb-16">
                                <h2 className="mb-8 text-h5-m sm:text-h5">{t('pages.place.about.title')}</h2>
                                <DraftToHtml json={place.description} />
                            </section>

                            <section className="mb-16">
                                <h2 className="mb-8 text-h5-m sm:text-h5">{t('pages.place.photos.title')}</h2>
                                <Photos
                                    title={place.title}
                                    description={place.author.name}
                                    photos={place.photos}
                                    cover={place.cover}
                                />
                            </section>

                            <section>
                                <h2 className="mb-8 text-h5-m sm:text-h5" id="reviews">
                                    {t('pages.place.reviews.title')}
                                </h2>
                                <AddReviewButton placeId={place.id} />
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
