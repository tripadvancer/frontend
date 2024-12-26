import { MapPin } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { getCountryByCode } from '@/services/countries'
import { ICountry } from '@/utils/types/country'

export const FeedCountriesItem = async ({ countryCode, placesCount }: ICountry) => {
    const t = await getTranslations()
    const locale = await getLocale()
    const country = getCountryByCode(countryCode)
    const countryName = country?.name[locale] ?? ''
    const countrySlug = country?.slug ?? ''

    return (
        <figure className="group overflow-hidden rounded-2xl bg-orange-10">
            <Link href={`/countries/${countrySlug}`} className="link-black">
                <div className="w-full overflow-hidden">
                    <ImageWithFallback
                        src={`/images/countries/preview/${countryCode.toLowerCase()}.jpg`}
                        width={256}
                        height={256}
                        className="aspect-square w-full rounded-t-2xl transition duration-300 group-hover:scale-110"
                        alt={countryName}
                    />
                </div>
                <figcaption className="flex flex-col justify-between p-4">
                    <h4 className="h7 mb-4 line-clamp-2 h-12 break-words sm:h-[52px]">{countryName}</h4>
                    <div className="flex flex-row items-center gap-x-2 text-black-40">
                        <MapPin size={16} />
                        {t('common.placesCounter', { count: placesCount })}
                    </div>
                </figcaption>
            </Link>
        </figure>
    )
}
