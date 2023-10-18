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
    }
}

export default async function Country({ params }: { params: { slug: string } }) {
    const locale = getCurrentLocale()
    const country = getCountryBySlug(params.slug)
    const countryCode = country?.code ?? ''
    const countryName = country?.name[locale] ?? ''
    const categories = await getCategories()
    const places = await getPlacesByCountryCode(countryCode)

    return (
        <div className="flex flex-col">
            <div className="relative z-10 -mb-8 flex flex-[800px] items-center justify-center pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    <Image
                        src={`https://source.unsplash.com/1920x1280/?${countryName}`}
                        className="object-cover"
                        alt={countryName}
                        fill
                        priority
                    />
                    <div className="bg-black-100 absolute bottom-0 left-0 right-0 top-0 z-20 opacity-30" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto w-2/3">
                        <Link href="/" className="mb-4 inline-block font-medium text-white hover:text-white">
                            View all countries
                        </Link>
                        <h1 className="text-h1-m sm:text-h1 mb-4 text-white">{countryName}</h1>
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
                    <div className="sm:w-2/3 mx-auto mb-16 flex flex-wrap justify-center gap-1">
                        <Categories categories={categories} />
                    </div>
                    <CountryPlacesFeed places={places} />
                </div>
            </div>
        </div>
    )
}
