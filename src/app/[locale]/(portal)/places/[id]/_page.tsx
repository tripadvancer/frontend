import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import type { IPhoto } from '@/types/photo'

import { Achievement } from '@/components/Achievement'
import { CoordinatesToCopy } from '@/components/CoordinatesToCopy'
import { DraftToHtml } from '@/components/DraftToHtml'
import { PhotoFeed } from '@/components/PhotoFeed'
import { PlacesNearbyList } from '@/components/PlacesNearbyList'
// import { ReviewFeed } from '@/components/Review/ReviewFeed'
import { UserPreview } from '@/components/UserPreview'
import { getPlaceById, getPlacesNearby } from '@/services/places'
import { getReviewsByPlaceId } from '@/services/reviews'
// import { getCountryNameByCode } from '@/utils/countries'
import { ImageVariant } from '@/utils/enums'
import { FormattedDate, makeImageUrl } from '@/utils/helpers'

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
// const place = await getPlaceById(params.id)
// const countryName = getCountryNameByCode(place.countryCode)

// return {
//     title: `${place.title}${countryName ? `, ${countryName}` : ''} | Tripadvancer`,
//     description: '',
// }
// }

export default async function Place({ params }: { params: { locale: string; id: string } }) {
    const place = await getPlaceById(params.id)
    const placesNearby = await getPlacesNearby(params.id)
    const reviews = await getReviewsByPlaceId(params.id)

    // const countryName = getCountryNameByCode(place.countryCode.toUpperCase())
    const formattedDate = FormattedDate(place.createdAt, params.locale)
    const photosWithCover: IPhoto[] = place.photos.slice()

    if (place.cover) {
        photosWithCover.unshift({ id: 0, url: place.cover })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="relative h-[540px] pb-8">
                <Image
                    src={makeImageUrl(place.cover, ImageVariant.PUBLIC)}
                    className="-z-10 object-cover"
                    alt={place.title}
                    fill
                    priority
                />
                <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-custom-black-100 opacity-30" />

                <div className="container flex h-full items-center justify-center">
                    <section className="py-16 text-center">
                        <Link
                            href={`/countries/${place.countryCode}`}
                            className="mb-5 inline-block text-sm text-white hover:text-white"
                        >
                            {/* {countryName} */}
                        </Link>
                        <h1 className="mb-5 text-5xl text-white">{place.title}</h1>
                        <CoordinatesToCopy coordinates={place.location.coordinates} className="mb-4" />
                        <div className="flex justify-center gap-2">
                            {place.categories.map(category => (
                                <div
                                    key={category.id}
                                    className="flex h-8 items-center rounded-full border border-white px-4 text-xs text-white"
                                >
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <div className="phone!rounded-none -mt-8 flex-1 rounded-t-4xl bg-white">
                <div className="phone!flex-col-reverse container flex gap-x-8 py-24">
                    <div className="flex-auto">
                        <section className="mb-16">
                            <h2 className="mb-8 text-2xl">About this place</h2>
                            <DraftToHtml json={place.description} />
                        </section>

                        <section className="mb-16">
                            <h2 className="mb-8 text-2xl">Photos</h2>
                            <div className="phone!grid-cols-2 grid grid-cols-5 gap-2">
                                <PhotoFeed photos={photosWithCover} title={place.title} size={186} />
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-8 text-2xl">Visitor reviews</h2>
                            {/* <ReviewFeed reviews={reviews} currentPage={0} /> */}
                        </section>
                    </div>

                    <div className="phone!w-auto w-64 flex-none">
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
                        />

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
