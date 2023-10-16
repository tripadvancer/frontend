import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import { PlacePreview } from '@/components/PlacePreview'
import { getPlacesByCountryCode } from '@/services/places'
import { getCountryBySlug } from '@/utils/countries'
import { getCurrentLocale } from '@/utils/i18n.server'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const locale = await getCurrentLocale()
    const country = getCountryBySlug(params.slug)
    const countryName = country?.name[locale] ?? ''

    return {
        title: `${countryName} | Tripadvancer`,
        description: '',
    }
}

export default async function Country({ params }: { params: { slug: string } }) {
    const locale = await getCurrentLocale()
    const country = getCountryBySlug(params.slug)
    const countryCode = country?.code ?? ''
    const countryName = country?.name[locale] ?? ''
    const places = await getPlacesByCountryCode(countryCode)

    return (
        <div className="flex flex-col">
            <div className="relative z-10 flex flex-[540px] items-center justify-center">
                <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full">
                    <Image
                        src={`https://source.unsplash.com/1920x1280/?${countryName}`}
                        className="object-cover"
                        alt={countryName}
                        fill
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-custom-black-100 to-transparent opacity-50" />
                </div>
                <section className="container text-center">
                    <div className="m-auto w-2/3">
                        <Link href="/" className="mb-5 inline-block text-sm text-white hover:text-white">
                            View all countries
                        </Link>
                        <h1 className="mb-5 text-5xl text-white">{countryName}</h1>
                        <p className="text-base text-white">
                            Proin mollis ligula at mi tempor, id luctus felis iaculis. Ut sit amet tincidunt velit, ut
                            aliquet augue. Sed luctus ac magna non gravida. Suspendisse potenti. Proin eu massa tempus
                            metus tristique scelerisque. Fusce elit neque, faucibus ut risus vel, gravida placerat
                            libero. Aliquam eget metus eu sem venenatis rhoncus.
                        </p>
                    </div>
                </section>
            </div>
            <div className="relative z-20 -mt-8 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="grid grid-cols-3 gap-8 phone:grid-cols-1">
                        {places.map(place => (
                            <PlacePreview key={place.id} {...place} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
