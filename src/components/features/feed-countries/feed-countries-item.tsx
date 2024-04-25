import Link from 'next/link'

import type { ICountry } from '@/utils/types/country'

import { PinIcon16 } from '@/components/ui/icons'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { getCountryByCode } from '@/services/countries'
import { getCurrentLocale, getI18n } from '@/utils/i18n/i18n.server'

export const FeedCountriesItem = async ({ countryCode, placesCount }: ICountry) => {
    const t = await getI18n()
    const locale = getCurrentLocale()
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
                        <PinIcon16 />
                        {t('countries.places', { count: placesCount })}
                    </div>
                </figcaption>
            </Link>
        </figure>
    )
}
