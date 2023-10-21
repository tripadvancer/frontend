import Image from 'next/image'
import Link from 'next/link'

import type { IPhoto } from '@/types/photo'

import { Achievement } from '@/components/Achievement'
import { CoordinatesToCopy } from '@/components/CoordinatesToCopy'
import { DraftToHtml } from '@/components/DraftToHtml'
import { PlacesNearbyList } from '@/components/PlacesNearbyList'
import { getPlaceById, getPlacesNearby } from '@/services/places'
import { getReviewsByPlaceId } from '@/services/reviews'
import { getCountryByCode } from '@/utils/countries'
import { CategoriesEnum, CategoryI18nKeys, ImageVariant } from '@/utils/enums'
import { FormattedDate, makeImageUrl } from '@/utils/helpers'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function Place({ params }: { params: { locale: string; id: string } }) {
    const tCategories = await getScopedI18n('categories')
    const place = await getPlaceById(params.id)
    const placesNearby = await getPlacesNearby(params.id)
    const reviews = await getReviewsByPlaceId(params.id)

    const country = getCountryByCode(place.countryCode.toUpperCase())
    const formattedDate = FormattedDate(place.createdAt, params.locale)
    const photosWithCover: IPhoto[] = place.photos.slice()

    const localizedCategories = place.categories
        .map(category => ({
            ...category,
            localizedName: tCategories(CategoryI18nKeys[CategoriesEnum[category.name]]),
        }))
        .sort((a, b) => a.localizedName.localeCompare(b.localizedName))

    if (place.cover) {
        photosWithCover.unshift({ id: 0, url: place.cover })
    }

    return (
        <div className="flex flex-col">
            <div className="relative z-10 -mb-8 flex flex-[540px] items-center justify-center pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    <Image
                        src={makeImageUrl(place.cover, ImageVariant.PUBLIC)}
                        className="object-cover"
                        alt={place.title}
                        fill
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto sm:w-2/3">
                        <Link
                            href={`/countries/${country?.slug}`}
                            className="mb-4 inline-block font-medium text-white hover:text-white"
                        >
                            {country?.name['en']}
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
                            />

                            {placesNearby.length > 0 && (
                                <section>
                                    <h3 className="mb-4 text-caps uppercase">Places nearby</h3>
                                    <PlacesNearbyList places={placesNearby} />
                                </section>
                            )}
                        </div>

                        <div className="flex-1">
                            <section className="mb-16">
                                <h2 className="mb-8 text-h5-m sm:text-h5">About this place</h2>
                                <DraftToHtml json={place.description} />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="flex min-h-screen flex-col">
        //     <div className="relative h-[540px] pb-8">
        //         <Image
        //             src={makeImageUrl(place.cover, ImageVariant.PUBLIC)}
        //             className="-z-10 object-cover"
        //             alt={place.title}
        //             fill
        //             priority
        //         />
        //         <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-black-100 opacity-30" />

        //         <div className="container flex h-full items-center justify-center">
        //             <section className="py-16 text-center">
        // <Link
        //     href={`/countries/${place.countryCode}`}
        //     className="mb-5 inline-block  text-white hover:text-white"
        // >
        //     {/* {countryName} */}
        // </Link>
        //                 <h1 className="mb-5  text-white">{place.title}</h1>
        //                 <CoordinatesToCopy coordinates={place.location.coordinates} className="mb-4" />
        // <div className="flex justify-center gap-2">
        //     {place.categories.map(category => (
        //         <div
        //             key={category.id}
        //             className="flex h-8 items-center rounded-full border border-white px-4  text-white"
        //         >
        //             {category.name}
        //         </div>
        //     ))}
        // </div>
        //             </section>
        //         </div>
        //     </div>

        //     <div className="phone!rounded-none -mt-8 flex-1 rounded-t-4xl bg-white">
        //         <div className="phone!flex-col-reverse container flex gap-x-8 py-24">
        //             <div className="flex-auto">
        // <section className="mb-16">
        //     <h2 className="mb-8 ">About this place</h2>
        //     <DraftToHtml json={place.description} />
        // </section>

        //                 <section className="mb-16">
        //                     <h2 className="mb-8 ">Photos</h2>
        //                     <div className="phone!grid-cols-2 grid grid-cols-5 gap-2">
        //                         <PhotoFeed photos={photosWithCover} title={place.title} size={186} />
        //                     </div>
        //                 </section>

        //                 <section>
        //                     <h2 className="mb-8 ">Visitor reviews</h2>
        //                     {/* <ReviewFeed reviews={reviews} currentPage={0} /> */}
        //                 </section>
        //             </div>

        //             <div className="phone!w-auto w-64 flex-none">

        //                 <section className="mb-8">
        //                     <h3 className="mb-4  uppercase">Author</h3>
        //                     <UserPreview {...place.author} date={formattedDate} />
        //                 </section>

        //                 {placesNearby.length > 0 && (
        //                     <section>
        //                         <h3 className="mb-4  uppercase">Places nearby</h3>
        //                         <PlacesNearbyList places={placesNearby} />
        //                     </section>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
