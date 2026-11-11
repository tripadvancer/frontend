import { MapPin } from 'lucide-react'

import Link from 'next/link'

import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { getCountryByCode } from '@/services/countries'
import { ICountry } from '@/utils/types/country'

export const CountriesGridItem = async ({ countryCode, placesCount }: ICountry) => {
    const country = getCountryByCode(countryCode)
    const countryName = country?.name ?? ''
    const countrySlug = country?.slug ?? ''

    return (
        <figure className="group bg-orange-10 overflow-hidden rounded-2xl">
            <Link href={`/countries/${countrySlug}`} className="link-black">
                <div className="w-full overflow-hidden">
                    <ImageWithFallback
                        src={`/images/countries/preview/${countryCode.toLowerCase()}.jpg`}
                        width={256}
                        height={256}
                        className="aspect-square w-full transition duration-300 group-hover:scale-110"
                        alt={countryName}
                    />
                </div>
                <figcaption className="flex flex-col gap-y-4 p-4">
                    <h4 className="h7 line-clamp-1 h-6 wrap-break-word sm:h-6.5">{countryName}</h4>
                    <div className="text-black-40 flex items-center gap-x-2">
                        <MapPin size={16} />
                        {placesCount === 0 ? 'No places' : placesCount === 1 ? '1 place' : placesCount + ' places'}
                    </div>
                </figcaption>
            </Link>
        </figure>
    )
}
