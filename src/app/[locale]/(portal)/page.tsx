import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import { CountryFeed } from '@/components/CountryFeed'
import { getI18n } from '@/locales/server'
import { getCountries } from '@/services/countries'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Tripadvancer - Plan your trip and find interesting places',
        description:
            'Tripadvancer will help you discover the world in a new way, find interesting places and go to an amazing trip.',
    }
}

export default async function Landing() {
    const t = await getI18n()
    const countries = await getCountries()

    return (
        <div className="container py-24">
            <section className="mb-24">
                <h1 className="mb-5 text-center text-5xl">{t('hello')}</h1>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ligula sed quam gravida
                    feugiat. Phasellus non semper purus. Aliquam placerat ipsum leo, et aliquam tortor condimentum quis.
                    Nulla sed arcu viverra, efficitur ex quis, tempus nulla.
                </p>
                <CountryFeed countries={countries} />
            </section>

            <section className="mb-24">
                <h2 className="mb-5 text-center text-4xl">Our features</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ligula sed quam gravida
                    feugiat. Phasellus non semper purus. Aliquam placerat ipsum leo, et aliquam tortor condimentum quis.
                    Nulla sed arcu viverra, efficitur ex quis, tempus nulla.
                </p>

                <div className="mb-8 flex flex-row items-center gap-16">
                    <Image src="/images/pic-1.svg" width={448} height={448} alt="" />
                    <div>
                        <h3 className="mb-8 text-3xl">Discover and share interesting places</h3>
                        <p className="text-sm">
                            Discover extraordinary places and unique landmarks to plan your unforgettable journey. Share
                            your impressions of the visited locations by leaving reviews and ratings, and you can also
                            add new places that are not yet on the map to help fellow travelers discover them.
                        </p>
                    </div>
                </div>

                <div className="mb-8 flex flex-row items-center gap-16">
                    <div className="text-right">
                        <h3 className="mb-8 text-3xl">Find random ones places around you</h3>
                        <p className="text-sm">
                            Don&rsquo;t know which place to choose to visit in your free time? Use our functionality for
                            random selection of a place near you! All you need to do is choose a category of the place
                            and an acceptable distance from you.
                        </p>
                    </div>
                    <Image src="/images/pic-2.svg" width={448} height={448} alt="" />
                </div>

                <div className="flex flex-row items-center gap-16">
                    <Image src="/images/pic-3.svg" width={448} height={448} alt="" />
                    <div>
                        <h3 className="mb-8 text-3xl">Manage your lists favorite places</h3>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ligula sed quam gravida
                            feugiat. Phasellus non semper purus. Aliquam placerat ipsum leo, et aliquam tortor
                            condimentum quis. Nulla sed arcu viverra, efficitur ex quis, tempus nulla.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-5 text-center text-4xl">World map</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ligula sed quam gravida
                    feugiat. Phasellus non semper purus. Aliquam placerat ipsum leo, et aliquam tortor condimentum quis.
                    Nulla sed arcu viverra, efficitur ex quis, tempus nulla.
                </p>

                <div className="relative">
                    <Image src="/images/map.svg" width={1120} height={400} alt="" />
                    <Link
                        href="/map"
                        className="absolute left-1/2 top-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 transform items-center rounded-lg bg-custom-orange-100 px-6 text-sm font-medium text-white transition-colors duration-300 ease-in-out hover:bg-custom-orange-active hover:text-white"
                    >
                        Explore the map
                    </Link>
                </div>
            </section>
        </div>
    )
}
