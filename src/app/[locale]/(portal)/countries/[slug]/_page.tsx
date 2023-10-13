import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import { PlacePreview } from '@/components/PlacePreview'
import { getPlacesByCountryCode } from '@/services/places'

// import { getCountryNameByCode } from '@/utils/countries'

// export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
//     const countryName = getCountryNameByCode(params.slug.toUpperCase(), locale)

//     return {
//         title: `${countryName} | Tripadvancer`,
//         description: '',
//     }
// }

export default async function Country({ params }: { params: { slug: string } }) {
    // const countryName = getCountryNameByCode(params.slug.toUpperCase())
    const places = await getPlacesByCountryCode(params.slug.toUpperCase())

    return (
        <div className="flex min-h-screen flex-col">
            <div className="relative h-[540px]">
                {/* <Image
                    src={`https://source.unsplash.com/1920x1280/?${countryName}`}
                    className="-z-10 object-cover"
                    alt="dasdad"
                    fill
                    priority
                /> */}
                <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-gradient-to-b from-custom-black-100 to-transparent opacity-50" />

                <div className="container flex h-full items-center justify-center phone:px-4">
                    <section className="py-16 text-center">
                        <Link href="/" className="mb-5 inline-block text-sm text-white hover:text-white">
                            View all countries
                        </Link>
                        {/* <h1 className="mb-5 text-5xl text-white">{countryName}</h1> */}
                        <p className="text-base text-white">
                            Proin mollis ligula at mi tempor, id luctus felis iaculis. Ut sit amet tincidunt velit, ut
                            aliquet augue. Sed luctus ac magna non gravida. Suspendisse potenti. Proin eu massa tempus
                            metus tristique scelerisque. Fusce elit neque, faucibus ut risus vel, gravida placerat
                            libero. Aliquam eget metus eu sem venenatis rhoncus.
                        </p>
                    </section>
                </div>
            </div>

            <div className="-mt-8 flex-1 rounded-t-4xl bg-white phone:rounded-none">
                <div className="container py-24 phone:px-4">
                    <div className="grid grid-cols-3 gap-8">
                        {places.map(place => (
                            <PlacePreview key={place.id} {...place} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
