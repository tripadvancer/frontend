import Link from 'next/link'

import type { ICountry } from '@/utils/types/country'

import { PinIcon16 } from '@/components/ui/icons'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { getCountryByCode } from '@/services/countries'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

export const LandingCountry = ({ countryCode, placesCount }: ICountry) => {
    const t = useI18n()
    const locale = useCurrentLocale()
    const country = getCountryByCode(countryCode)
    const countryName = country?.name[locale] ?? ''
    const countrySlug = country?.slug ?? ''

    return (
        <figure className="group overflow-hidden rounded-2xl bg-orange-10">
            <Link href={`/countries/${countrySlug}`}>
                <div className="w-full overflow-hidden">
                    <ImageWithFallback
                        src={`/images/countries/preview/${countryCode.toLowerCase()}.jpg`}
                        width={256}
                        height={256}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                        alt={countryName}
                        className="w-full rounded-t-2xl object-cover transition duration-300 group-hover:scale-110"
                    />
                </div>
                <figcaption className="flex flex-col justify-between p-4">
                    <h4 className="mb-4 line-clamp-2 h-12 break-words text-h7-m sm:h-[52px] sm:text-h7">
                        {countryName}
                    </h4>
                    <div className="flex flex-row items-center gap-x-2 text-blue-100">
                        <PinIcon16 />
                        {t('countries.places', { count: placesCount })}
                    </div>
                </figcaption>
            </Link>
        </figure>
    )
}
