import Image from 'next/image'
import Link from 'next/link'

import type { ICountry } from '@/utils/types/country'

import { getCountryByCode } from '@/services/countries'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

type CountryPreviewProps = ICountry

export const Country = ({ countryCode, placesCount }: CountryPreviewProps) => {
    const t = useI18n()
    const locale = useCurrentLocale()
    const country = getCountryByCode(countryCode)
    const countryName = country?.name[locale] ?? ''
    const countrySlug = country?.slug ?? ''

    return (
        <figure className="group overflow-hidden rounded-2xl bg-orange-10">
            <Link href={`/countries/${countrySlug}`}>
                <div className="w-full overflow-hidden">
                    <Image
                        src={`https://source.unsplash.com/256x256/?${countryName}`}
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
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6 6C6 4.89543 6.89543 4 8 4C9.10457 4 10 4.89543 10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6Z" />
                            <path
                                fillRule="evenodd"
                                d="M8 15.9995L6.96927 15.0809C3.67789 12.1477 2 8.54211 2 6.10311C2 2.64043 4.65737 0 8 0C11.3426 0 14 2.64043 14 6.10311C14 8.54211 12.3221 12.1477 9.03073 15.0809L8 15.9995ZM12 6.10311C12 3.74787 10.2409 2 8 2C5.75908 2 4 3.74787 4 6.10311C4 7.77275 5.298 10.8469 8 13.3171C10.702 10.8469 12 7.77275 12 6.10311Z"
                            />
                        </svg>
                        {t('countries.places', { count: placesCount })}
                    </div>
                </figcaption>
            </Link>
        </figure>
    )
}
