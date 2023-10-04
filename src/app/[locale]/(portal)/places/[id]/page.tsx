import Image from 'next/image'
import type { Metadata } from 'next/types'

import { DraftToHtml } from '@/components/DraftToHtml'
import { PhotoFeed } from '@/components/PhotoFeed'
import { PlaceAchievement } from '@/components/PlaceAchievement'
import { PlacesNearbyList } from '@/components/PlacesNearbyList'
import { ReviewFeed } from '@/components/ReviewFeed'
import { UserPreview } from '@/components/UserPreview'
import { getPlaceById, getPlacesNearby } from '@/services/places'
import { getReviewsByPlaceId } from '@/services/reviews'
import { getCountryNameByCode } from '@/utils/countries'
import { ImageVariant } from '@/utils/enums'
import { FormattedDate, makeImageUrl } from '@/utils/helpers'
import { IPhoto } from '@/utils/interfaces'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const countryName = getCountryNameByCode(place.countryCode)

    return {
        title: `${place.title}${countryName ? `, ${countryName}` : ''} | Tripadvancer`,
        description: '',
    }
}

export default async function Place({ params }: { params: { locale: string; id: string } }) {
    const place = await getPlaceById(params.id)
    const placesNearby = await getPlacesNearby(params.id)
    const reviews = await getReviewsByPlaceId(params.id)

    const formattedDate = FormattedDate(place.createdAt, params.locale)
    const photosWithCover: IPhoto[] = place.photos.slice()

    if (place.cover) {
        photosWithCover.unshift({ id: 0, url: place.cover })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="relative h-[540px]">
                <Image
                    src={makeImageUrl(place.cover, ImageVariant.PUBLIC)}
                    className="-z-10 object-cover"
                    alt={place.title}
                    fill
                    priority
                />
                <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-gradient-to-b from-custom-black-100 to-transparent opacity-50" />

                <div className="container flex h-full flex-col phone:px-4">
                    <div className="flex-1 py-16">
                        <h1 className="mb-2 text-4xl text-white">{place.title}</h1>
                        <div className="mb-4 text-base text-white">
                            {place.location.coordinates[1].toFixed(5)}, {place.location.coordinates[0].toFixed(5)}
                        </div>
                        <div className="flex gap-2">
                            {place.categories.map(category => (
                                <div
                                    key={category.id}
                                    className="flex h-8 items-center rounded-full border border-white px-4 text-xs text-white"
                                >
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="-mt-8 flex-1 rounded-t-4xl bg-white phone:rounded-none">
                <div className="container flex gap-x-8 pb-24 pt-16 phone:flex-col-reverse phone:px-4">
                    <div className="flex-auto">
                        <section className="mb-16">
                            <h2 className="mb-8 text-2xl">About this place</h2>
                            <DraftToHtml json={place.description} />
                        </section>

                        <section className="mb-16">
                            <h2 className="mb-8 text-2xl">Photos</h2>
                            <div className="grid grid-cols-5 gap-2 phone:grid-cols-2">
                                <PhotoFeed photos={photosWithCover} title={place.title} size={186} />
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-8 text-2xl">Visitor reviews</h2>
                            <ReviewFeed reviews={reviews} />
                        </section>
                    </div>

                    <div className="w-64 flex-none phone:w-auto">
                        <PlaceAchievement title={place.title} />

                        <section className="mb-8">
                            <h3 className="mb-4 text-sm uppercase">Author</h3>
                            <UserPreview {...place.author} date={formattedDate} />
                        </section>

                        {placesNearby.length > 0 && (
                            <section>
                                <h3 className="mb-4 text-sm uppercase">Places nearby</h3>
                                <PlacesNearbyList places={placesNearby} />
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
