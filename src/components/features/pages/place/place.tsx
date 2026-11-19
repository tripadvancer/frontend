import { ErrorBoundary } from 'react-error-boundary'

import { JsonLd } from '@/components/features/common/json-ld'
import { GetPlaceByIdResponse } from '@/services/places.types'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'
import { getCountryByCode } from '@/utils/helpers/countries'
import { getPlacePath } from '@/utils/helpers/places'

import { PlaceHeader } from './components/place-header'
import { PlaceMainAbandonedWarning } from './components/place-main-abandoned-warning'
import { PlaceMainDescription } from './components/place-main-description'
import { PlaceMainPhotos } from './components/place-main-photos'
import { PlaceMainReviewsWithAuth } from './components/place-main-reviews-with-auth'
import { PlaceSidebarActionsWithAuth } from './components/place-sidebar-actions-with-auth'
import { PlaceSidebarAuthor } from './components/place-sidebar-author'
import { PlaceSidebarNearby } from './components/place-sidebar-nearby'
import { PlaceSidebarRating } from './components/place-sidebar-rating'

export const Place = ({ place }: { place: GetPlaceByIdResponse }) => {
    const country = getCountryByCode(place.countryCode)
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string
    const placeUrl = `${baseUrl}${getPlacePath(place.id, place.countryCode)}`
    const placeDescription = place.description
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    const [longitude, latitude] = place.location.coordinates
    const image = place.cover ? makeImageUrl(place.cover, ImageVariants.PUBLIC) : undefined

    return (
        <>
            <JsonLd
                data={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                            ...(country
                                ? [
                                      {
                                          '@type': 'ListItem',
                                          position: 2,
                                          name: country.name,
                                          item: `${baseUrl}/${country.slug}`,
                                      },
                                  ]
                                : []),
                            {
                                '@type': 'ListItem',
                                position: country ? 3 : 2,
                                name: place.title,
                                item: placeUrl,
                            },
                        ],
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Place',
                        name: place.title,
                        ...(placeDescription && { description: placeDescription }),
                        url: placeUrl,
                        ...(image && { image }),
                        geo: {
                            '@type': 'GeoCoordinates',
                            latitude,
                            longitude,
                        },
                        ...(country && {
                            address: {
                                '@type': 'PostalAddress',
                                addressCountry: country.code,
                            },
                        }),
                    },
                ]}
            />
            <section className="container space-y-8 py-16 sm:space-y-16">
                <PlaceHeader {...place} />

                <div className="flex flex-col gap-y-8 sm:gap-y-16 lg:flex-row-reverse lg:gap-x-8">
                    <div className="flex w-full flex-col gap-y-8 lg:w-64">
                        <div className="flex flex-col gap-y-4">
                            <PlaceSidebarRating {...place} />
                            <PlaceSidebarActionsWithAuth {...place} />
                        </div>
                        <PlaceSidebarAuthor {...place} />
                        <ErrorBoundary fallback={null}>
                            <PlaceSidebarNearby {...place} />
                        </ErrorBoundary>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-y-8 sm:gap-y-16">
                        <PlaceMainAbandonedWarning {...place} />
                        <PlaceMainPhotos {...place} />
                        <PlaceMainDescription {...place} />
                        <PlaceMainReviewsWithAuth {...place} />
                    </div>
                </div>
            </section>
        </>
    )
}
