import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import { Categories } from '@/components/Categories/Categories'
import { CountryPlacesFeed } from '@/components/CountryPlacesFeed/CountryPlacesFeed'
import { getCategories } from '@/services/categories'
import { getPlacesByCountryCode } from '@/services/places'
import { getCountryBySlug } from '@/utils/countries'
import { getCurrentLocale } from '@/utils/i18n.server'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const locale = getCurrentLocale()
    const country = getCountryBySlug(params.slug)
    const countryName = country?.name[locale] ?? ''

    return {
        title: countryName,
        openGraph: {
            title: countryName,
            description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
            images: [
                {
                    url: `https://source.unsplash.com/1920x1280/?${countryName}`,
                    width: 1920,
                    height: 1280,
                    type: 'image/jpeg',
                    alt: countryName,
                },
            ],
        },
        twitter: {
            title: countryName,
            description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
            images: `https://source.unsplash.com/1920x1280/?${countryName}`,
        },
    }
}

export default async function Country({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { categories?: string }
}) {
    const countrySlug = params.slug
    const selectedCategories = searchParams.categories
    const locale = getCurrentLocale()
    const country = getCountryBySlug(countrySlug)
    const countryCode = country?.code ?? ''
    const countryName = country?.name[locale] ?? ''
    const categories = await getCategories()
    const places = await getPlacesByCountryCode(countryCode, selectedCategories)

    return (
        <div className="flex flex-col">
            <div className="relative z-10 -mb-8 flex flex-[540px] items-center justify-center pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    <Image
                        src={`https://source.unsplash.com/1920x1280/?${countryName}`}
                        className="object-cover"
                        alt={countryName}
                        fill
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto w-2/3">
                        <Link href="/" className="mb-4 inline-block font-medium text-white hover:text-white">
                            View all countries
                        </Link>
                        <h1 className="mb-4 text-h1-m text-white sm:text-h1">{countryName}</h1>
                        <p className="text-big text-white">
                            Proin mollis ligula at mi tempor, id luctus felis iaculis. Ut sit amet tincidunt velit, ut
                            aliquet augue. Sed luctus ac magna non gravida. Suspendisse potenti. Proin eu massa tempus
                            metus tristique scelerisque. Fusce elit neque, faucibus ut risus vel, gravida placerat
                            libero. Aliquam eget metus eu sem venenatis rhoncus.
                        </p>
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="mx-auto mb-16 flex flex-wrap justify-center gap-1 sm:w-2/3">
                        <Categories
                            categories={categories}
                            selectedCategories={selectedCategories?.split(',').map(Number) ?? []}
                        />
                    </div>
                    <CountryPlacesFeed places={places} />
                </div>
            </div>
        </div>
    )
}
